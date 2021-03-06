﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using settings4all.Repository.Mappers;
using MongoDB.Driver;
using log4net;
using System.Linq.Expressions;
using MongoDB.Bson;
using settings4all.Repository.Interfaces;
using settings4all.Model;
using settings4all.MongoRepository.Models;

namespace settings4all.MongoRepository
{
    public class MongoSettingsRepository : IMultiAppSettingsRepository
    {
        private static ILog logger = LogManager.GetLogger(typeof(MongoSettingsRepository));

        protected IMongoDatabase Database { get; private set; }

        private IMongoCollection<SettingMongo> SettingsCollection { get; set; }

        private IMongoClient MongoClient { get; set; }

        public MongoSettingsRepository(string connectionString)
        {
            if (string.IsNullOrEmpty(connectionString))
                throw new ArgumentException("Invalid mongo connection string");

            try
            {
                var mongoUrl = MongoUrl.Create(connectionString);
                this.MongoClient = new MongoClient(mongoUrl);
                this.Database = this.MongoClient.GetDatabase(mongoUrl.DatabaseName);
                this.SettingsCollection = this.Database.GetCollection<SettingMongo>("Settings");
                // filters  and browsing by application and environment will be really common
                this.SettingsCollection.Indexes.CreateOne(Builders<SettingMongo>.IndexKeys.Ascending(s => s.Application));
                this.SettingsCollection.Indexes.CreateOne(Builders<SettingMongo>.IndexKeys.Ascending(s => s.Environment));
                // ensuring that there are no duplicated settings in a given app & env
                CreateIndexOptions indexOptions = new CreateIndexOptions();
                IndexKeysDefinition<SettingMongo> keysDef = Builders<SettingMongo>.IndexKeys.Ascending(s => s.Application)
                                                                                            .Ascending(s => s.Environment)
                                                                                            .Ascending(s => s.Fullpath);
                indexOptions.Unique = true;
                this.SettingsCollection.Indexes.CreateOne(keysDef, indexOptions);
            }
            catch (Exception exp)
            {
                logger.Error("Expcetion when setting up Mongo Connection/DB/Collection for the settings4all", exp);
                throw;
            }
        }

        public void AddSetting(Setting setting)
        {
            this.AddSettingAsync(setting).Wait();
        }

        public async Task AddSettingAsync(Setting setting)
        {
            try
            {
                SettingMongo settingMongo = StoredSettingMapper.Map<SettingMongo>(setting);
                settingMongo.Created = settingMongo.Updated = DateTimeOffset.UtcNow;
                await this.SettingsCollection.InsertOneAsync(settingMongo).ConfigureAwait(false);
            }
            catch (Exception exp)
            {
                logger.Warn(string.Format("Error adding setting {0} to mongo", Newtonsoft.Json.JsonConvert.SerializeObject(setting)), exp);
                throw;
            }
        }

        public async Task<List<Setting>> GetSettingsAsync(string application = null, string currentEnvironment = null)
        {
            try
            {
                Expression<Func<SettingMongo, bool>> filterExpression = s => true;

                if (!string.IsNullOrEmpty(application))
                {
                    if (string.IsNullOrEmpty(currentEnvironment))
                        filterExpression = s => s.Application == application;
                    else
                        filterExpression = s => s.Application == application && s.Environment == currentEnvironment;
                }

                var filter = Builders<SettingMongo>.Filter.Where(filterExpression);
                var result = await this.SettingsCollection.FindAsync<SettingMongo>(filter).ConfigureAwait(false);
                return StoredSettingMapper.Map(await result.ToListAsync().ConfigureAwait(false)).ToList();
            }
            catch (Exception exp)
            {
                logger.Warn(string.Format("Error getting settings from mongo for the app {0} and env {1}", application, currentEnvironment), exp);
                throw;
            }
        }

        public List<Setting> GetSettings(string application = null, string currentEnvironment = null)
        {
            return this.GetSettingsAsync(application, currentEnvironment).Result;
        }

        public async Task UpdateSettingAsync(string id, Setting value)
        {
            try
            {
                SettingMongo settingMongo = StoredSettingMapper.Map<SettingMongo>(value);
                var filter = Builders<SettingMongo>.Filter.Eq(s => s.DbId, new ObjectId(id));
                var update = Builders<SettingMongo>.Update.Set(s => s.JSONValue, settingMongo.JSONValue)
                                                          .Set(s => s.Documentation, settingMongo.Documentation)
                                                          .Set(s => s.Updated, DateTimeOffset.UtcNow);

                await this.SettingsCollection.UpdateOneAsync(filter, update).ConfigureAwait(false);
            }
            catch (Exception exp)
            {
                logger.Warn(string.Format("Error while updating setting {0} into mongo", Newtonsoft.Json.JsonConvert.SerializeObject(value)), exp);
                throw;
            }
        }

        public void UpdateSetting(string id, Setting value)
        {
            this.UpdateSettingAsync(id, value).RunSynchronously();
        }

        public async Task DeleteSettingAsync(string id)
        {
            try
            {
                var filter = Builders<SettingMongo>.Filter.Where(s => s.DbId == new ObjectId(id));
                await this.SettingsCollection.DeleteOneAsync(filter);
            }
            catch (Exception exp)
            {
                logger.Warn(string.Format("Error while deleting setting with id {0} into mongo", id), exp);
                throw;
            }
        }

        public void DeleteSetting(string id)
        {
            this.DeleteSettingAsync(id).RunSynchronously();
        }

        public List<string> GetApps()
        {
            return this.GetAppsAsync().Result;
        }

        public async Task<List<string>> GetAppsAsync()
        {
            try
            {
                var filter = Builders<SettingMongo>.Filter.Empty;
                FieldDefinition<SettingMongo, string> fieldToDistinct = nameof(SettingMongo.Application);
                var result = await this.SettingsCollection.DistinctAsync<string>(fieldToDistinct, filter).ConfigureAwait(false);
                return await result.ToListAsync().ConfigureAwait(false);
            }
            catch (Exception exp)
            {
                logger.Warn("Error getting available apps from mongo", exp);
                throw;
            }
        }

        public List<string> GetAppEnvironments(string app)
        {
            return this.GetAppEnvironmentsAsync(app).Result;
        }

        public async Task<List<string>> GetAppEnvironmentsAsync(string app)
        {
            try
            {
                var filter = Builders<SettingMongo>.Filter.Where(s => s.Application == app);
                FieldDefinition<SettingMongo, string> fieldToDistinct = nameof(SettingMongo.Environment);
                var result = await this.SettingsCollection.DistinctAsync<string>(fieldToDistinct, filter).ConfigureAwait(false);
                return await result.ToListAsync().ConfigureAwait(false);
            }
            catch (Exception exp)
            {
                logger.Warn(string.Format("Error getting the available environments for the app {0} from mongo", app), exp);
                throw;
            }
        }

        public Setting GetSetting(string id = null)
        {
            return this.GetSettingAsync(id).Result;
        }

        public async Task<Setting> GetSettingAsync(string id)
        {
            try
            {
                var filter = Builders<SettingMongo>.Filter.Where(s => s.DbId == new ObjectId(id));
                var result = await this.SettingsCollection.Find<SettingMongo>(filter)
                                                          .SingleOrDefaultAsync()
                                                          .ConfigureAwait(false);
                return StoredSettingMapper.Map(result);
            }
            catch (Exception exp)
            {
                logger.Warn(string.Format("Error getting with id {0} from EF", id), exp);
                throw;
            }
        }

    }
}

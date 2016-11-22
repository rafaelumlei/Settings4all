using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using settings4all.Repository.Interfaces;
using System;

namespace settings4all.MongoRepository.Models
{
    class SettingMongo : IStoredSetting
    {

        public SettingMongo()
        {
        }

        /// <summary>
        /// Gets or sets the setting identifier
        /// </summary>
        [BsonIgnore]
        public string Id
        {
            get
            {
                return this.DbId.ToString();
            }

            set
            {
                this.DbId = value != null ? new ObjectId(value) : new ObjectId();
            }
        }

        [BsonId]
        public ObjectId DbId { get; set; }

        /// <summary>
        /// Gets or sets the name of the application/host that owns this setting
        /// </summary>
        public string Application { get; set; }

        /// <summary>
        /// Gets or sets the environment to which the setting value applies
        /// </summary>
        public string Environment { get; set; }

        /// <summary>
        /// Gets or sets full path to the setting (tipically Namespace + Class + Field)
        /// </summary>
        public string Fullpath { get; set; }

        /// <summary>
        /// Gets or sets the setting documentation: possible values 
        /// and impacts in the system
        /// </summary>
        public string Documentation { get; set; }

        /// <summary>
        /// Setting JSON value
        /// </summary>
        public string JSONValue { get; set; }

        public DateTimeOffset Created { get; set; }

        public DateTimeOffset Updated { get; set; }

    }
}

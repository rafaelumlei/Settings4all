using System;
using System.Collections.Generic;
using System.Linq;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using settings4all.Repository.Interfaces;

namespace settings4all.Repository.Mappers
{
    public class StoredSettingMapper
    {

        public static T Map<T>(settings4all.Model.Setting setting) where T : IStoredSetting, new()
        {
            if (setting != null)
            {
                T mappedSetting = new T();
                IStoredSetting iMappedSetting = mappedSetting as IStoredSetting;
                iMappedSetting.Id = setting.Id;
                iMappedSetting.Application = setting.Application;
                iMappedSetting.Documentation = setting.Documentation;
                iMappedSetting.Environment = setting.Environment;
                iMappedSetting.Fullpath = setting.Fullpath;
                iMappedSetting.JSONValue = JsonConvert.SerializeObject(setting.JSONValue);
                iMappedSetting.Updated = setting.Updated;
                iMappedSetting.Created = setting.Created;
                return mappedSetting;
            }
            else
                return default(T);
        }

        public static settings4all.Model.Setting Map(IStoredSetting setting)
        {
            if (setting != null)
            {
                settings4all.Model.Setting mappedSetting = new settings4all.Model.Setting();
                mappedSetting.Id = setting.Id;
                mappedSetting.Application = setting.Application;
                mappedSetting.Documentation = setting.Documentation;
                mappedSetting.Environment = setting.Environment;
                mappedSetting.Fullpath = setting.Fullpath;
                mappedSetting.JSONValue = JToken.Parse(setting.JSONValue);
                mappedSetting.Updated = setting.Updated;
                mappedSetting.Created = setting.Created;
                return mappedSetting;
            }
            else
            {
                return null;
            }
        }

        public static IEnumerable<T> Map<T>(IEnumerable<settings4all.Model.Setting> settings) where T : IStoredSetting, new()
        {
            List<T> mapped = new List<T>();

            if (settings != null && settings.Any())
                foreach (var setting in settings)
                    mapped.Add(Map<T>(setting));

            return mapped;
        }

        public static IEnumerable<settings4all.Model.Setting> Map(IEnumerable<IStoredSetting> settings)
        {
            List<settings4all.Model.Setting> mapped = new List<settings4all.Model.Setting>();

            if (settings != null && settings.Any())
                foreach (var setting in settings)
                    mapped.Add(Map(setting));

            return mapped;
        }

    }
}

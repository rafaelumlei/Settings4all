﻿using Newtonsoft.Json.Linq;
using System;

namespace settings4all.Model
{
    public class Setting
    {

        public Setting()
        {
        }

        public Setting(string applicationname, string environment, string fullpath, JToken jtoken, string doc) : this()
        {
            this.Application = applicationname;
            this.Environment = environment;
            this.Fullpath = fullpath;
            this.JSONValue = jtoken;
            this.Documentation = doc;
            this.Created = this.Updated = DateTimeOffset.UtcNow;
        }

        /// <summary>
        /// Gets or sets the setting identifier
        /// </summary>
        public string Id { get; set; }

        /// <summary>
        /// App + ":" + Env + ":" + Key
        /// </summary>
        public string Key
        {
            get
            {
                return this.Application + ":" + this.Environment + ":" + this.Fullpath;
            }
        }

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

        public DateTimeOffset Created { get; set; }

        public DateTimeOffset Updated { get; set; }

        /// <summary>
        /// Setting JSON value
        /// </summary>
        public JToken JSONValue { get; set; }

        public static bool operator ==(Setting x, Setting y)
        {
            if (object.ReferenceEquals(x, null) || object.ReferenceEquals(y, null))
            {
                return object.ReferenceEquals(x, null) && object.ReferenceEquals(y, null);
            }
            else
            {
                return x.Application == y.Application
                    && x.Fullpath == y.Fullpath
                    && x.Documentation == y.Documentation
                    && JToken.DeepEquals(x.JSONValue, y.JSONValue);
            }
        }

        public static bool operator !=(Setting x, Setting y)
        {
            return !(x == y);
        }

        public override bool Equals(Object obj)
        {
            return obj is Setting && this == (Setting)obj;
        }

        public void Update(Setting newValue)
        {
            this.Environment = newValue.Environment;
            this.Fullpath = newValue.Fullpath;
            this.Documentation = newValue.Documentation;
            this.JSONValue = newValue.JSONValue;
            this.Updated = DateTimeOffset.UtcNow;
        }
    }
}

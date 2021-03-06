﻿using settings4all.Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace settings4all.EFRepository.Models
{
    class SettingEF : IStoredSetting
    {
        public SettingEF()
        {
        }

        /// <summary>
        /// Gets or sets the setting identifier
        /// </summary>
        [NotMapped]
        public string Id
        {
            get
            {
                return this.DbId.ToString();
            }

            set
            {
                this.DbId = long.Parse(value ?? "0");
            }
        }

        [Key]
        [Column("Id")]
        public long DbId { get; set;}

        /// <summary>
        /// Gets or sets the name of the application/host that owns this setting
        /// </summary>
        [Index]
        [Index("Ix_Unique_App_Env_Fullpath", 1, IsUnique = true)]
        [StringLength(150)]
        public string Application { get; set; }

        /// <summary>
        /// Gets or sets the environment to which the setting value applies
        /// </summary>
        [Index]
        [Index("Ix_Unique_App_Env_Fullpath", 1, IsUnique = true)]
        [StringLength(50)]
        public string Environment { get; set; }

        /// <summary>
        /// Gets or sets full path to the setting (tipically Namespace + Class + Field)
        /// </summary>
        [StringLength(450)]
        [Index("Ix_Unique_App_Env_Fullpath", 1, IsUnique = true)]
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

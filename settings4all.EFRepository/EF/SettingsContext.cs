using settings4all.EFRepository.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure.Annotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace settings4all.EFRepository.EF
{
    class SettingsContext : DbContext
    {

        public DbSet<SettingEF> Settings { get; set; }

        public SettingsContext(string connectionString) : base(connectionString)
        {
        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
        }

    }
}

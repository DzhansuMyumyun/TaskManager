using Entities.Concrete;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccess.Concrete.EntityFramework
{
    //connect Db tables with classes 
    public class TaskManagerContext : DbContext
    {
        //public TaskManagerContext(DbContextOptions<TaskManagerContext> options) : base(options)
        //{

        //}

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(@"Server=(localdb)\\MSSQLLocalDB;Database=TaskManager;Trusted_Connection=True;TrustServerCertificate=True;TrustServerCertificate=True");
        }


        public DbSet<TaskItem> TaskItems { get; set; }
    }
}

using Core.Entities.Concrete;
using Entities.Concrete;
using Microsoft.EntityFrameworkCore;

namespace DataAccess.Concrete.EntityFramework
{
    public class TaskManagerContext : DbContext
    {
        public TaskManagerContext()
        {
        }
        public TaskManagerContext(DbContextOptions<TaskManagerContext> options) : base(options)
        {
        }

        // Optional localdb config
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer(
                    "Server=(localdb)\\MSSQLLocalDB;Database=TaskManager;Trusted_Connection=True;TrustServerCertificate=True");
            }
        }

        #region DbSets
        public DbSet<User> Users { get; set; }
        public DbSet<OperationClaim> OperationClaims { get; set; }
        public DbSet<UserOperationClaim> UserOperationClaims { get; set; }
        public DbSet<Project> Projects { get; set; }
        public DbSet<TaskItem> TaskItems { get; set; }
        public DbSet<SubTask> SubTasks { get; set; }
        public DbSet<Attachment> Attachments { get; set; }
        public DbSet<TaskActivity> TaskActivities { get; set; }
        public DbSet<ProjectActivity> ProjectActivities { get; set; }
        #endregion

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            #region User
            modelBuilder.Entity<User>(u =>
            {
                u.ToTable("Users").HasKey(x => x.Id);

                u.Property(x => x.FirstName).IsRequired().HasMaxLength(50);
                u.Property(x => x.LastName).IsRequired().HasMaxLength(50);
                u.Property(x => x.Email).IsRequired().HasMaxLength(100);

                u.HasMany<UserOperationClaim>()
                 .WithOne(uoc => uoc.User)
                 .HasForeignKey(uoc => uoc.UserId)
                 .OnDelete(DeleteBehavior.Cascade);
            });
            #endregion

            #region OperationClaim
            modelBuilder.Entity<OperationClaim>(oc =>
            {
                oc.ToTable("OperationClaims").HasKey(x => x.Id);
                oc.Property(x => x.Name).IsRequired().HasMaxLength(50);

                oc.HasMany<UserOperationClaim>()
                  .WithOne(uoc => uoc.OperationClaim)
                  .HasForeignKey(uoc => uoc.OperationClaimId)
                  .OnDelete(DeleteBehavior.Cascade);
            });
            #endregion

            #region UserOperationClaim
            modelBuilder.Entity<UserOperationClaim>(uoc =>
            {
                uoc.ToTable("UserOperationClaims").HasKey(x => x.Id);
            });
            #endregion

            #region Project
            modelBuilder.Entity<Project>(p =>
            {
                p.ToTable("Projects").HasKey(x => x.Id);
                p.Property(x => x.Name).IsRequired().HasMaxLength(100);
                p.Property(x => x.ColorHex).IsRequired().HasMaxLength(7);
                p.Property(x => x.Category).IsRequired();
                p.Property(x => x.CreatedAt).HasDefaultValueSql("GETUTCDATE()");

                p.HasMany(x => x.TaskItems)
                 .WithOne()
                 .HasForeignKey(t => t.ProjectId)
                 .OnDelete(DeleteBehavior.Cascade);
            });
            #endregion

            #region TaskItem
            modelBuilder.Entity<TaskItem>(t =>
            {
                t.ToTable("TaskItems").HasKey(x => x.Id);
                t.Property(x => x.Title).IsRequired().HasMaxLength(200);
                t.Property(x => x.Status).IsRequired();
                t.Property(x => x.Priority).IsRequired();
                t.Property(x => x.CreatedAt).HasDefaultValueSql("GETUTCDATE()");

                t.HasMany(x => x.SubTasks)
                 .WithOne()
                 .HasForeignKey(st => st.TaskItemId)
                 .OnDelete(DeleteBehavior.Cascade);

                t.HasMany(x => x.Attachments)
                 .WithOne()
                 .HasForeignKey(a => a.TaskItemId)
                 .OnDelete(DeleteBehavior.Cascade);

                t.HasMany(x => x.TaskActivities)
                 .WithOne()
                 .HasForeignKey(ta => ta.TaskItemId)
                 .OnDelete(DeleteBehavior.Cascade);
            });
            #endregion

            #region SubTask
            modelBuilder.Entity<SubTask>(st =>
            {
                st.ToTable("SubTasks").HasKey(x => x.Id);
                st.Property(x => x.Title).IsRequired().HasMaxLength(200);
                st.Property(x => x.IsCompleted).HasDefaultValue(false);
            });
            #endregion

            #region Attachment
            modelBuilder.Entity<Attachment>(a =>
            {
                a.ToTable("Attachments").HasKey(x => x.Id);
                a.Property(x => x.FileName).IsRequired().HasMaxLength(200);
                a.Property(x => x.FilePath).IsRequired().HasMaxLength(500);
                a.Property(x => x.FileType).HasMaxLength(50);
                a.Property(x => x.UploadedAt).HasDefaultValueSql("GETUTCDATE()");
            });
            #endregion

            #region TaskActivity
            modelBuilder.Entity<TaskActivity>(ta =>
            {
                ta.ToTable("TaskActivities").HasKey(x => x.Id);
                ta.Property(x => x.LogDetails).IsRequired();
                ta.Property(x => x.CreatedAt).HasDefaultValueSql("GETUTCDATE()");

                // FK to Core.User
                ta.HasOne<User>()
                  .WithMany()
                  .HasForeignKey(ta => ta.UserId)
                  .OnDelete(DeleteBehavior.Restrict); // don't delete history if user removed

                ta.HasOne<TaskItem>()
                  .WithMany(t => t.TaskActivities)
                  .HasForeignKey(ta => ta.TaskItemId)
                  .OnDelete(DeleteBehavior.SetNull);
            });
            #endregion

            #region ProjectActivity
            modelBuilder.Entity<Project>()
                .HasMany(p => p.ProjectActivities)
                .WithOne(a => a.Project)
                .HasForeignKey(a => a.ProjectId)
                .OnDelete(DeleteBehavior.Cascade);
            #endregion
        }
    }
}
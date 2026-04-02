
using Entities.Abstract;
using System;
using System.Collections.Generic;
using System.Text;

namespace Entities.Concrete
{
    public class Project : IEntity
    {
        public int Id { get; set; }

        public int UserId { get; set; } // FK to Core User

        public string Name { get; set; } = string.Empty;
        public string ColorHex { get; set; } = string.Empty;

        public ProjectCategory Category { get; set; } = ProjectCategory.Work;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // Navigation to TaskItems
        public virtual ICollection<TaskItem> TaskItems { get; set; } = new List<TaskItem>();
        public virtual List<ProjectActivity> ProjectActivities { get; set; } = new();
    }
}


using Entities.Abstract;
using System;
using System.Collections.Generic;
using System.Net.Mail;
using System.Text;

namespace Entities.Concrete
{
    public class TaskItem : IEntity
    {
        public int Id { get; set; }

        public int ProjectId { get; set; } // FK to Project

        public string Title { get; set; } = string.Empty;
        public string? Description { get; set; }

        public TaskStatus Status { get; set; } = TaskStatus.Todo;
        public PriorityStatus Priority { get; set; } = PriorityStatus.Medium;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? DueDate { get; set; }

        // Navigation
        public virtual ICollection<SubTask> SubTasks { get; set; } = new List<SubTask>();
        public virtual ICollection<Attachment> Attachments { get; set; } = new List<Attachment>();
        public virtual ICollection<TaskActivity> TaskActivities { get; set; } = new List<TaskActivity>();

        // Enums
        public enum TaskStatus
        {
            Todo = 0,
            InProgress = 1,
            Done = 2
        }

        public enum PriorityStatus
        {
            Low = 0,
            Medium = 1,
            High = 2
        }
    }
}

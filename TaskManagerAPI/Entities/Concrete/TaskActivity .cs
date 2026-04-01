using Entities.Abstract;
using System;
using System.Collections.Generic;
using System.Text;

namespace Entities.Concrete
{
    public class TaskActivity : IEntity
    {
        public int Id { get; set; }

        public int TaskItemId { get; set; } // FK to TaskItem
        public int UserId { get; set; }     // FK to Core User

        public string LogDetails { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}

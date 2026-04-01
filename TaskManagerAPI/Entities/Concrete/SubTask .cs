using Entities.Abstract;
using System;
using System.Collections.Generic;
using System.Text;

namespace Entities.Concrete
{
    public class SubTask : IEntity
    {
        public int Id { get; set; }

        public int TaskItemId { get; set; } // FK to TaskItem

        public string Title { get; set; } = string.Empty;
        public bool IsCompleted { get; set; } = false;
    }
}

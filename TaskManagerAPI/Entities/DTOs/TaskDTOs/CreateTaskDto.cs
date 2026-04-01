using Entities.Abstract;
using Entities.Concrete;
using System;
using System.Collections.Generic;
using System.Data;
using System.Text;

namespace Entities.DTOs.TaskDTOs
{
    public class CreateTaskDto:IDto
    {
        public int ProjectId { get; set; }

        public string Title { get; set; } 
        public string? Description { get; set; }

        public DateTime? DueDate { get; set; }

        public TaskItem.TaskStatus Status { get; set; }
        public TaskItem.PriorityStatus Priority { get; set; }
    }
}

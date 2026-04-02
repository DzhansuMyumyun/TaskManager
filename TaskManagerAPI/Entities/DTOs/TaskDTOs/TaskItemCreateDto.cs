using Entities.Abstract;
using Entities.Concrete;
using System;
using System.Collections.Generic;
using System.Data;
using System.Text;

namespace Entities.DTOs.TaskDTOs
{
    public class TaskItemCreateDto:IDto
    {
        public int ProjectId { get; set; }
        public string Title { get; set; } = string.Empty;
        public string? Description { get; set; }
        public TaskItem.TaskStatus Status { get; set; } = TaskItem.TaskStatus.Todo;
        public TaskItem.PriorityStatus Priority { get; set; } = TaskItem.PriorityStatus.Medium;
        public DateTime? DueDate { get; set; }


    }
}

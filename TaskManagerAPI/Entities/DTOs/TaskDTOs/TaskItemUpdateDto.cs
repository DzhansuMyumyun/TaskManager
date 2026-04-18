using Entities.Abstract;
using Entities.Concrete;
using Entities.DTOs.SubtaskDTOs;
using System;
using System.Collections.Generic;
using System.Text;

namespace Entities.DTOs.TaskDTOs
{
    public class TaskItemUpdateDto:IDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string? Description { get; set; }
        public TaskItem.TaskStatus Status { get; set; }
        public TaskItem.PriorityStatus Priority { get; set; }
        public DateTime? DueDate { get; set; }
        public List<SubTaskUpdateDto> SubTasks { get; set; }
    }
}

using Entities.Abstract;
using System;
using System.Collections.Generic;
using System.Text;

namespace Entities.DTOs
{
    public class TaskActivityCreateDto : IDto
    {
        public int? TaskItemId { get; set; }
        public int UserId { get; set; }
        public string LogDetails { get; set; } = string.Empty;
    }
}

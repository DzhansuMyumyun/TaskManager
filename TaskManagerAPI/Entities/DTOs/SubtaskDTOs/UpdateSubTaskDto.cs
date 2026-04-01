using Entities.Abstract;
using System;
using System.Collections.Generic;
using System.Text;

namespace Entities.DTOs.SubtaskDTOs
{
    public class UpdateSubTaskDto :IDto
    {
        public int Id { get; set; }

        public string Title { get; set; } 
        public bool IsCompleted { get; set; }
    }
}

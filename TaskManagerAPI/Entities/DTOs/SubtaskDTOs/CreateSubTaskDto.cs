using Entities.Abstract;
using System;
using System.Collections.Generic;
using System.Text;

namespace Entities.DTOs.SubtaskDTOs
{
    public class CreateSubTaskDto : IDto
    {
        public int TaskItemId { get; set; }
        public string Title { get; set; }
    }
}

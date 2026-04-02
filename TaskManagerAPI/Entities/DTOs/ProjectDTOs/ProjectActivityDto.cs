using Entities.Abstract;
using System;
using System.Collections.Generic;
using System.Text;

namespace Entities.DTOs.ProjectDTOs
{
    public class ProjectActivityDto : IDto
    {
        public int Id { get; set; }
        public int ProjectId { get; set; }
        public string LogDetails { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
    }
}

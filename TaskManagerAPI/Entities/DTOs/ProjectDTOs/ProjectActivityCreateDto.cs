using Entities.Abstract;
using Entities.Concrete;
using System;
using System.Collections.Generic;
using System.Text;

namespace Entities.DTOs.ProjectDTOs
{
    public class ProjectActivityCreateDto : IDto
    {
        public int ProjectId { get; set; }
        public int UserId { get; set; }
        public string LogDetails { get; set; } = string.Empty;
    }
}

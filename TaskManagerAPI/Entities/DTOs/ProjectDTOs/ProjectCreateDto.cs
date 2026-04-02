using Entities.Abstract;
using Entities.Concrete;
using System;
using System.Collections.Generic;
using System.Text;

namespace Entities.DTOs.ProjectDTOs
{
    public class ProjectCreateDto : IDto
    {

        public int UserId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string ColorHex { get; set; } = "#FFFFFF";
        public ProjectCategory Category { get; set; } = ProjectCategory.Work;
    }
}

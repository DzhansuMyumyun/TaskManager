using Entities.Abstract;
using System;
using System.Collections.Generic;
using System.Text;

namespace Entities.DTOs.ProjectDTOs
{
    public class ProjectDto : IDto
    {
        public int Id { get; set; }

        public string Name { get; set; }
        public string ColorHex { get; set; }

        public string Category { get; set; }
    }
}

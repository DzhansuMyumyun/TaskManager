using Entities.Abstract;
using Entities.Concrete;
using System;
using System.Collections.Generic;
using System.Text;

namespace Entities.DTOs.ProjectDTOs
{
    public class CreateProjectDto : IDto
    {
        public string Name { get; set; }
        public string ColorHex { get; set; } 

        public ProjectCategory Category { get; set; }
    }
}

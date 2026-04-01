using Entities.Abstract;
using System;
using System.Collections.Generic;
using System.Text;

namespace Entities.DTOs.UserDTOs
{
    public class UserDto : IDto
    {
        public int Id { get; set; }
        public string FullName { get; set; } 
        public string Email { get; set; }
    }
}

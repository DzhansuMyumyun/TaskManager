using Entities.Abstract;
using System;
using System.Collections.Generic;
using System.Text;

namespace Entities.DTOs.AttachmentDTOs
{
    public class CreateAttachmentDto : IDto
    {
        public int TaskItemId { get; set; }

        public string FileName { get; set; } 
        public string FilePath { get; set; } 
        public string FileType { get; set; }
    }
}

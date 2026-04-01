using Entities.Abstract;
using System;
using System.Collections.Generic;
using System.Text;

namespace Entities.DTOs
{
    public class ProjectSummaryDto : IDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string ColorHex { get; set; }
        public int TotalTasks { get; set; }
        public int CompletedTasks { get; set; }

        public decimal CompletionPercentage => TotalTasks == 0
            ? 0
            : Math.Round((decimal)CompletedTasks / TotalTasks * 100, 2);
    }
}

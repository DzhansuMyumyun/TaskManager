using Entities.Concrete;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Text;

namespace Business.ValidationRules.FluentValidation
{
    public class TaskItemValidator : AbstractValidator<TaskItem>
    {
        public TaskItemValidator()
        {
            RuleFor(t => t.Title).NotEmpty();
            RuleFor(t => t.Title).MinimumLength(2);
            RuleFor(t => t.Status).NotEmpty();
            RuleFor(t => t.DueDate).GreaterThanOrEqualTo(DateTime.Now).WithMessage("You cannot select a date in the past.");
        }
    }
}

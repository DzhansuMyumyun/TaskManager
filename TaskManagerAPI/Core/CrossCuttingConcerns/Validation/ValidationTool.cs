using FluentValidation;
using System;
using System.Collections.Generic;
using System.Text;

namespace Core.CrossCuttingConcerns.Validation
{
    public static class ValidationTool
    {
        public static void Validate(IValidator validator, object entity)
        {
            //var context = new ValidationContext<TqskItem>(item);
            var context = new ValidationContext<object>(entity);
            //var result  = taskItemValidator.Validate(context);
            var result  = validator.Validate(context);
            if (!result.IsValid) 
            {
                throw new ValidationException(result.Errors);
            }

        }
    }
}

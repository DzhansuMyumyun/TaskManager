using Core.Entities;
using Entities.Abstract;
using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Entities.Concrete
{
    public class UserOperationClaim:IEntity
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int OperationClaimId { get; set; }


        // Navigation
        public virtual User User { get; set; } = null!;
        public virtual OperationClaim OperationClaim { get; set; } = null!;
    }
}

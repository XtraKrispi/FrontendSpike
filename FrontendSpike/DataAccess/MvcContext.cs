using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using FrontendSpike.Models;

namespace FrontendSpike.DataAccess
{
    public class MvcContext : DbContext
    {
        public MvcContext(): base("MVCDatabase"){}
        public DbSet<User> Users { get; set; }
    }
}
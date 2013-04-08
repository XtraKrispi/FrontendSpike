using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web.Http;
using FrontendSpike.DataAccess;
using FrontendSpike.Models;

namespace FrontendSpike.Controllers
{
    public class UsersController : ApiController
    {
        public List<User> Get(string username = null, string firstName = null, string lastName = null, string emailAddress = null)
        {
            using (var context = new MvcContext())
            {
                var query = context
                    .Users.AsQueryable();

                if (!String.IsNullOrWhiteSpace(username))
                {
                    query = query.Where(u => u.Username.ToLower() == username);

                }
                if (!String.IsNullOrWhiteSpace(firstName))
                {
                    query = query.Where(u => u.FirstName.ToLower() == firstName);

                }
                if (!String.IsNullOrWhiteSpace(lastName))
                {
                    query = query.Where(u => u.LastName.ToLower() == lastName);

                }
                if (!String.IsNullOrWhiteSpace(emailAddress))
                {
                    query = query.Where(u => u.EmailAddress.ToLower() == emailAddress);

                }

                return query.ToList();
            }
        }

        public User Get(int id)
        {
            using (var context = new MvcContext())
            {
                var user = context.Users.SingleOrDefault(u => u.UserId == id);

                if (user == null)
                {
                    throw new HttpResponseException(HttpStatusCode.NotFound);
                }

                return user;
            }
        }

        public User Post(User user)
        {
            using (var context = new MvcContext())
            {
                if (user == null)
                {
                    throw new HttpResponseException(HttpStatusCode.InternalServerError);
                }

                user.CreatedDate = DateTime.Now;
                context.Users.Add(user);
                context.SaveChanges();

                return user;
            }   
        }

        public void Put(int id, User user)
        {
            using (var context = new MvcContext())
            {
                var userFromDb = context.Users.SingleOrDefault(u => u.UserId == id);

                if (user == null || userFromDb == null)
                {
                    throw new HttpResponseException(HttpStatusCode.NotFound);
                }
                userFromDb.EmailAddress = user.EmailAddress;
                userFromDb.FirstName = user.FirstName;
                userFromDb.LastName = user.LastName;
                userFromDb.ModifiedDate = DateTime.Now;
                context.SaveChanges();
            }   
        }

        public void Delete(int id)
        {
            using (var context = new MvcContext())
            {
                var user = context.Users.SingleOrDefault(u => u.UserId == id);

                if (user == null)
                {
                    throw new HttpResponseException(HttpStatusCode.NotFound);
                }

                context.Users.Remove(user);
                context.SaveChanges();
            }
        }
    }
}

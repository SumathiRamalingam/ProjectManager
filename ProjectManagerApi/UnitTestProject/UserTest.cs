using NUnit.Framework;
using System;
using PMApiBL.Controllers;
using System.Web.Http;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http.Results;
using ProjectManagerApi.Controllers;
using DataModel;

namespace UnitTestProject
{
    [TestFixture]
    public class UserTest
    {
        UserController objUsr = new UserController();

        [Test]
        public void B_AddUser()
        {
            User objNew = new User();
            objNew.EmployeeId = "111";
            objNew.FirstName = "Usr1";
            objNew.LastName = "BBBB";
            objUsr.PostUser(objNew);            
            var response = objUsr.GetUser(GetUser("111").UserId.ToString()) as OkNegotiatedContentResult<User>;
            Assert.AreEqual(response.Content.EmployeeId, objNew.EmployeeId);
        }
       

        [Test]
        public void C_GetUsersListTest()
        {            
            List<User> actualResult = objUsr.GetUsers().ToList();
            Assert.AreEqual(actualResult.Count()>0, true);
        }

        [Test]
        public void D_GetUserTest()
        {
            var response = objUsr.GetUser(GetUser("111").UserId.ToString()) as OkNegotiatedContentResult<User>;
            Assert.AreEqual(response.Content.EmployeeId,"111");
        }
        [Test]
        public void E_DelelteUser()
        {
            objUsr.DeleteUser(GetUser("111").UserId.ToString());
            var response = objUsr.GetUser(GetUser("111").UserId.ToString()) as OkNegotiatedContentResult<User>;
            Assert.IsNull(response, null);

        }

        [Test]
        public void A_UpdateUser()
        {
            User objUpdate = new User();
            objUpdate.EmployeeId = "222";
            objUpdate.FirstName = "ZZZZZ";
            objUpdate.LastName = "LName";
            objUpdate.UserId = 2;
            objUsr.PutUser("2", objUpdate);
            var response = objUsr.GetUser("2") as OkNegotiatedContentResult<User>;
            Assert.AreEqual(response.Content.FirstName, "ZZZZZ");
        }
        public User GetUser(string EmployeeId)
        {
            List<User> objUser = objUsr.GetUsers().ToList();
            var result = objUser.Where(x => x.EmployeeId == EmployeeId);
            User res = new User();
            foreach (var item in result)
            {
                res.EmployeeId = item.EmployeeId;
                res.FirstName = item.FirstName;
                res.LastName = item.LastName;
                res.UserId = item.UserId;
            }
            return res;
        }
       
    }
}

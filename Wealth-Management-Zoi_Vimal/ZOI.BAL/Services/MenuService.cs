using System;
using System.Collections.Generic;
using System.Text;
using ZOI.BAL.Services.Interface;
using ZOI.DAL.DatabaseUtility;
using ZOI.DAL.DatabaseUtility.Interface;

namespace ZOI.BAL.Services
{
    public class MenuService : IMenuService
    {
        //Use this adofunctions to fetch data
        private readonly IADODataFuntion _adoDataFunction;
        public MenuService(IADODataFuntion adoDataFunction) {
            _adoDataFunction = adoDataFunction;
        }
    }
}

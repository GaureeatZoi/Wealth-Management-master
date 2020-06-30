using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net.Http;
using System.Reflection;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Newtonsoft.Json;
using RestSharp;
using ZOI.BAL.Models;

namespace ZOI.APP.Controllers
{
    public class DashboardController : Controller
    {
        public IActionResult Dashboard()
        {
            return View();
        }

        public PartialViewResult GetFilters()
        {
            DashboardFilters model = new DashboardFilters();
            var client = new RestClient($"http://localhost:65481/Dashboard/GetFilterDropdowns");
            var request = new RestRequest(Method.POST);
            IRestResponse response = client.Execute(request);
            model = JsonConvert.DeserializeObject<DashboardFilters>(response.Content);
            return PartialView("_Filters", model);  
        }

        public PartialViewResult GetCharts(int isProductOrAsset)
        {
            ProductAssetCharts model = new ProductAssetCharts();
            var client = new RestClient($"http://localhost:65481/Dashboard/GetChartData");
            var request = new RestRequest(Method.POST);
            request.AddParameter("isProductOrAsset", isProductOrAsset);
            IRestResponse response = client.Execute(request);
            model = JsonConvert.DeserializeObject<ProductAssetCharts>(response.Content);
            return PartialView("_ProductAssetDetails", model);
        }

        /// <summary>
        /// Method for getting Software mapping list
        /// </summary>
        /// <param name="param"></param>
        /// <param name="pageIndex"></param>
        /// <returns></returns>
        public JsonResult GetAssetSummary(AjaxDataTable param)
        {
            var client = new RestClient($"http://localhost:65481/Dashboard/GetAssetDataSummary");
            var request = new RestRequest(Method.POST);
            IRestResponse response = client.Execute(request);
            IEnumerable<AssetData> summary = JsonConvert.DeserializeObject<IEnumerable<AssetData>>(response.Content);
            int totalconsumable = summary.Count();
            var sortDirection = HttpContext.Request.Query["sSortDir_0"]; // asc or desc
            var sortColumnIndex = Convert.ToInt32(HttpContext.Request.Query["iSortCol_0"]);
            if (!string.IsNullOrEmpty(param.sSearch)) summary = summary.Where(z => z.AssetClass.ToLower().Contains(param.sSearch.ToLower()));
            summary = sortColumnIndex switch
            {
                0 => sortDirection == "asc" ? summary.OrderBy(z => z.AssetClass) : summary.OrderByDescending(z => z.AssetClass),
                1 => sortDirection == "asc" ? summary.OrderBy(z => z.ValueAtCost) : summary.OrderByDescending(z => z.ValueAtCost),
                2 => sortDirection == "asc" ? summary.OrderBy(z => z.MarketValue) : summary.OrderByDescending(z => z.MarketValue),
                3 => sortDirection == "asc" ? summary.OrderBy(z => z.Weightage) : summary.OrderByDescending(z => z.Weightage),
                _ => sortDirection == "desc" ? summary.OrderBy(z => z.UnrealizedGL) : summary.OrderByDescending(z => z.UnrealizedGL),
            };
            int filteredconsumableCount = summary.Count();
            if (param.iDisplayLength > 0)
            {
                summary = summary.Skip(param.iDisplayStart).Take(param.iDisplayLength);
            }
            return Json(new
            {
                param.sEcho,
                iTotalRecords = totalconsumable,
                iTotalDisplayRecords = filteredconsumableCount,
                aaData = summary
            });
        }

        public JsonResult GetCashFlowSummary(AjaxDataTable param)
        {
            var client = new RestClient($"http://localhost:65481/Dashboard/GetCashFlowDataSummary");
            var request = new RestRequest(Method.POST);
            IRestResponse response = client.Execute(request);
            IEnumerable<CashFlowData> summary = JsonConvert.DeserializeObject<IEnumerable<CashFlowData>>(response.Content);
            int totalconsumable = summary.Count();
            var sortDirection = HttpContext.Request.Query["sSortDir_0"]; // asc or desc
            var sortColumnIndex = Convert.ToInt32(HttpContext.Request.Query["iSortCol_0"]);
            if (!string.IsNullOrEmpty(param.sSearch)) summary = summary.Where(z => z.CashFlow.ToLower().Contains(param.sSearch.ToLower()));
            summary = sortColumnIndex switch
            {
                0 => sortDirection == "asc" ? summary.OrderBy(z => z.CashFlow) : summary.OrderByDescending(z => z.CashFlow),
                1 => sortDirection == "asc" ? summary: summary,
                _ => sortDirection == "desc" ? summary : summary,
            };
            int filteredconsumableCount = summary.Count();
            if (param.iDisplayLength > 0)
            {
                summary = summary.Skip(param.iDisplayStart).Take(param.iDisplayLength);
            }
            return Json(new
            {
                param.sEcho,
                iTotalRecords = totalconsumable,
                iTotalDisplayRecords = filteredconsumableCount,
                aaData = summary
            });
        }

        private static List<T> ConvertDataTable<T>(DataTable dt)
        {
            List<T> data = new List<T>();
            foreach (DataRow row in dt.Rows)
            {
                T item = GetItem<T>(row);
                data.Add(item);
            }
            return data;
        }

        private static T GetItem<T>(DataRow dr)
        {
            Type temp = typeof(T);
            T obj = Activator.CreateInstance<T>();

            foreach (DataColumn column in dr.Table.Columns)
            {
                foreach (PropertyInfo pro in temp.GetProperties())
                {
                    if (pro.Name == column.ColumnName)
                        pro.SetValue(obj, dr[column.ColumnName], null);
                    else
                        continue;
                }
            }
            return obj;
        }

        public PartialViewResult GetSlidersData()
        {
            Slider model = new Slider();
            var client = new RestClient($"http://localhost:65481/Dashboard/GetSliderDetails");
            var request = new RestRequest(Method.POST);
            IRestResponse response = client.Execute(request);
            model.Details = JsonConvert.DeserializeObject<List<Slider>>(response.Content); 
            return PartialView("_SliderDetails",model);
        }



        [HttpGet]
        public IEnumerable<MfReports> GetCorpusInOutdata(string DtFrom = "", string DtTo = "", string AMC = "", string Trantype = "", string PtfType = "", string Acc = "", string Product = "", string Prodtype = "")
        {
            MfReports model = new MfReports();
            if (DtFrom is null)
            {
                DtFrom = "";
            }
            if (DtTo is null)
            {
                DtTo = "";
            }
            if (AMC is null)
            {
                AMC = "";
            }
            if (Trantype is null)
            {
                Trantype = "";
            }
            if (PtfType is null)
            {
                PtfType = "";
            }
            if (Acc is null)
            {
                Acc = "";
            }
            if (Prodtype is null)
            {
                Prodtype = "";
            }
            if (Product is null)
            {
                Product = "";
            }

            var client = new RestClient($"http://localhost:65481/Dashboard/GetCorpusInOutReportData");
            var request = new RestRequest(Method.POST);
            request.AddParameter("DtFrom", DtFrom);
            request.AddParameter("DtTo", DtTo);
            request.AddParameter("AMC", AMC);
            request.AddParameter("Trantype", Trantype);
            request.AddParameter("PtfType", PtfType);
            request.AddParameter("Acc", Acc);
            request.AddParameter("Prodtype", Prodtype);
            request.AddParameter("Product", Product);
            IRestResponse response = client.Execute(request);
            return JsonConvert.DeserializeObject<IEnumerable<MfReports>>(response.Content);

            
        }


        public IActionResult CorpusInOutReport()
        {
            return View();

        }

        [HttpGet]
        public IEnumerable<MfReports> GetTransactionReportData(string DtFrom = "", string DtTo = "", string AMC = "", string Trantype = "", string PtfType = "", string Acc = "", string Product = "", string Prodtype = "")
        {
            MfReports model = new MfReports();
            if (DtFrom is null)
            {
                DtFrom = "";
            }
            if (DtTo is null)
            {
                DtTo = "";
            }
            if (AMC is null)
            {
                AMC = "";
            }
            if (Trantype is null)
            {
                Trantype = "";
            }
            if (PtfType is null)
            {
                PtfType = "";
            }
            if (Acc is null)
            {
                Acc = "";
            }
            if (Prodtype is null)
            {
                Prodtype = "";
            }
            if (Product is null)
            {
                Product = "";
            }

            var client = new RestClient($"http://localhost:65481/Dashboard/GetTransactionReportData");
            var request = new RestRequest(Method.POST);
            request.AddParameter("DtFrom", DtFrom);
            request.AddParameter("DtTo", DtTo);
            request.AddParameter("AMC", AMC);
            request.AddParameter("Trantype", Trantype);
            request.AddParameter("PtfType", PtfType);
            request.AddParameter("Acc", Acc);
            request.AddParameter("Prodtype", Prodtype);
            request.AddParameter("Product", Product);
            IRestResponse response = client.Execute(request);
            return JsonConvert.DeserializeObject<IEnumerable<MfReports>>(response.Content);


        }

        public IActionResult TransactionReport()
        {
            return View();

        }

        [HttpGet]
        public IEnumerable<MfReports> GetMaturityReportData(string DtFrom = "", string DtTo = "", string AMC = "", string Trantype = "", string PtfType = "", string Acc = "", string Product = "", string Prodtype = "")
        {
            MfReports model = new MfReports();
            if (DtFrom is null)
            {
                DtFrom = "";
            }
            if (DtTo is null)
            {
                DtTo = "";
            }
            if (AMC is null)
            {
                AMC = "";
            }
            if (Trantype is null)
            {
                Trantype = "";
            }
            if (PtfType is null)
            {
                PtfType = "";
            }
            if (Acc is null)
            {
                Acc = "";
            }
            if (Prodtype is null)
            {
                Prodtype = "";
            }
            if (Product is null)
            {
                Product = "";
            }

            var client = new RestClient($"http://localhost:65481/Dashboard/GetMaturityReportData");
            var request = new RestRequest(Method.POST);
            request.AddParameter("DtFrom", DtFrom);
            request.AddParameter("DtTo", DtTo);
            request.AddParameter("AMC", AMC);
            request.AddParameter("Trantype", Trantype);
            request.AddParameter("PtfType", PtfType);
            request.AddParameter("Acc", Acc);
            request.AddParameter("Prodtype", Prodtype);
            request.AddParameter("Product", Product);
            IRestResponse response = client.Execute(request);
            return JsonConvert.DeserializeObject<IEnumerable<MfReports>>(response.Content);


        }

        public IActionResult MaturityReport()
        {
            return View();

        }

        [HttpGet]
        public IEnumerable<MfReports> GetInterestStatementData(string DtFrom = "", string DtTo = "", string AMC = "", string Trantype = "", string PtfType = "", string Acc = "", string Product = "", string Prodtype = "")
        {
            MfReports model = new MfReports();
            if (DtFrom is null)
            {
                DtFrom = "";
            }
            if (DtTo is null)
            {
                DtTo = "";
            }
            if (AMC is null)
            {
                AMC = "";
            }
            if (Trantype is null)
            {
                Trantype = "";
            }
            if (PtfType is null)
            {
                PtfType = "";
            }
            if (Acc is null)
            {
                Acc = "";
            }
            if (Prodtype is null)
            {
                Prodtype = "";
            }
            if (Product is null)
            {
                Product = "";
            }

            var client = new RestClient($"http://localhost:65481/Dashboard/GetInterestStatementData");
            var request = new RestRequest(Method.POST);
            request.AddParameter("DtFrom", DtFrom);
            request.AddParameter("DtTo", DtTo);
            request.AddParameter("AMC", AMC);
            request.AddParameter("Trantype", Trantype);
            request.AddParameter("PtfType", PtfType);
            request.AddParameter("Acc", Acc);
            request.AddParameter("Prodtype", Prodtype);
            request.AddParameter("Product", Product);
            IRestResponse response = client.Execute(request);
            return JsonConvert.DeserializeObject<IEnumerable<MfReports>>(response.Content);


        }

        public IActionResult InterestStatement()
        {
            return View();

        }

        [HttpGet]
        public IEnumerable<MfReports> GetDividentReportData(string DtFrom = "", string DtTo = "", string AMC = "", string Trantype = "", string PtfType = "", string Acc = "", string Product = "", string Prodtype = "")
        {
            MfReports model = new MfReports();
            if (DtFrom is null)
            {
                DtFrom = "";
            }
            if (DtTo is null)
            {
                DtTo = "";
            }
            if (AMC is null)
            {
                AMC = "";
            }
            if (Trantype is null)
            {
                Trantype = "";
            }
            if (PtfType is null)
            {
                PtfType = "";
            }
            if (Acc is null)
            {
                Acc = "";
            }
            if (Prodtype is null)
            {
                Prodtype = "";
            }
            if (Product is null)
            {
                Product = "";
            }

            var client = new RestClient($"http://localhost:65481/Dashboard/GetDividentReportData");
            var request = new RestRequest(Method.POST);
            request.AddParameter("DtFrom", DtFrom);
            request.AddParameter("DtTo", DtTo);
            request.AddParameter("AMC", AMC);
            request.AddParameter("Trantype", Trantype);
            request.AddParameter("PtfType", PtfType);
            request.AddParameter("Acc", Acc);
            request.AddParameter("Prodtype", Prodtype);
            request.AddParameter("Product", Product);
            IRestResponse response = client.Execute(request);
            return JsonConvert.DeserializeObject<IEnumerable<MfReports>>(response.Content);


        }

        public IActionResult DividentReport()
        {
            return View();

        }


        [HttpGet]
        public IEnumerable<MfReports> GetCashSummarydata(string DtFrom = "", string DtTo = "", string AMC = "", string Trantype = "", string PtfType = "", string Acc = "", string Product = "", string Prodtype = "")
        {
            MfReports model = new MfReports();
            if (DtFrom is null)
            {
                DtFrom = "";
            }
            if (DtTo is null)
            {
                DtTo = "";
            }
            if (AMC is null)
            {
                AMC = "";
            }
            if (Trantype is null)
            {
                Trantype = "";
            }
            if (PtfType is null)
            {
                PtfType = "";
            }
            if (Acc is null)
            {
                Acc = "";
            }
            if (Prodtype is null)
            {
                Prodtype = "";
            }
            if (Product is null)
            {
                Product = "";
            }

            var client = new RestClient($"http://localhost:65481/Dashboard/GetCashSummarydata");
            var request = new RestRequest(Method.POST);
            request.AddParameter("DtFrom", DtFrom);
            request.AddParameter("DtTo", DtTo);
            request.AddParameter("AMC", AMC);
            request.AddParameter("Trantype", Trantype);
            request.AddParameter("PtfType", PtfType);
            request.AddParameter("Acc", Acc);
            request.AddParameter("Prodtype", Prodtype);
            request.AddParameter("Product", Product);
            IRestResponse response = client.Execute(request);
            return JsonConvert.DeserializeObject<IEnumerable<MfReports>>(response.Content);


        }

        public IActionResult CashSummary()
        {
            return View();

        }
    }
}
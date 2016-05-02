using System.Web;
using System.Web.Mvc;

namespace BGL_Pervaiz_Akhtar
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }
    }
}

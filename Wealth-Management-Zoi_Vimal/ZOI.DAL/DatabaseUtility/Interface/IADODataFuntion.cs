using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Text;

namespace ZOI.DAL.DatabaseUtility.Interface
{
    public interface IADODataFuntion
    {
        List<T> ExecSQL<T>(string query);
        List<T> ExecSQL<T>(string query, SqlParameter[] param);
        DataSet ExecuteDataset(string CommandText, SqlParameter[] SqlParameters, CommandType Type = CommandType.StoredProcedure);

        //DataSet ExecuteDataset(string CommandText, DbContextConnection connect, SqlParameter[] SqlParameters, CommandType Type = CommandType.StoredProcedure);

        int ExecuteNonQuery(string CommandText, SqlParameter[] SqlParameters, CommandType Type = CommandType.StoredProcedure);
    }
}

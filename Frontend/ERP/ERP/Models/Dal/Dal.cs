using System;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;

//namespace ERP.Models.Dal
//{
//    public class Dal
//    {
//    }
//}


namespace ERP.Dal
{
    public class CommanDal
    {
        private SqlDataAdapter adaptr;
        private SqlConnection conn;
        private SqlCommand command;
        private SqlDataReader reader;
        public CommanDal()
        {
            adaptr = new SqlDataAdapter();
            conn = new SqlConnection(ConfigurationManager.ConnectionStrings
                    ["CS"].ConnectionString);
        }
        //return dataset to business layer        
        public  DataSet ExecuteDataSet(string commandText, SqlParameter[] param, bool isProcedure)
        {
            command = new SqlCommand();
            command.Connection = conn;

            command.CommandText = commandText;
            DataSet dataset = new DataSet();
            if (isProcedure == false)
            {
                command.CommandType = CommandType.Text;
            }
            else
            {
                command.CommandType = CommandType.StoredProcedure;
            }
            if ((param != null) && (param.Length != 0))
            {
                foreach (SqlParameter p in param)
                {
                    command.Parameters.Add(p);
                }
            }
            adaptr = new SqlDataAdapter();
            adaptr.SelectCommand = (SqlCommand)command;

            adaptr.Fill(dataset);
            command.Dispose();
            return dataset;

        }
        //execute procedure without returning cursor        
        public  void ExecuteNonQuery(string commandText, SqlParameter[] param, bool isProcedure)
        {
            command = new SqlCommand();
            command.Connection = conn;

            if (conn.State == ConnectionState.Closed)
            {
                conn.Open();
            }
            command.CommandText = commandText;
            if (isProcedure == false)
            {
                command.CommandType = CommandType.Text;
            }
            else
            {
                command.CommandType = CommandType.StoredProcedure;
            }

            if ((param != null) && (param.Length != 0))
            {
                foreach (SqlParameter p in param)
                {
                    command.Parameters.Add(p);
                }
            }
            command.ExecuteNonQuery();
            // string rowsEffected = "a";
            conn.Close();
            command.Dispose();
            //return rowsEffected;
        }
        //return datatable to business layer        
        public  DataTable ExecuteDataTable(string commandText, SqlParameter[] param, bool isProcedure)
        {
            command = new SqlCommand();
            command.Connection = conn;

            command.CommandText = commandText; ;
            DataTable datatable = new DataTable();
            if (isProcedure == false)
            {
                command.CommandType = CommandType.Text;
            }
            else
            {
                command.CommandType = CommandType.StoredProcedure;
            }
            if ((param != null) && (param.Length != 0))
            {
                foreach (SqlParameter p in param)
                {
                    command.Parameters.Add(p);
                }
            }
            adaptr = new SqlDataAdapter();
            adaptr.SelectCommand = (SqlCommand)command;


            adaptr.Fill(datatable);
            command.Dispose();
            return datatable;

        }
        //return datareader to business layer        
        public SqlDataReader ExecuteReader(string commandText, SqlParameter[] param, bool isProcedure)
        {
            /// <summary>Executes Command and return DataReader </summary>

            if (conn.State == ConnectionState.Closed)
            {
                conn.Open();
            }
            command = new SqlCommand();
            command.CommandText = commandText;
            if (isProcedure == false)
            {
                command.CommandType = CommandType.Text;
            }
            else
            {
                command.CommandType = CommandType.StoredProcedure;
            }

            if ((param != null) && (param.Length != 0))
            {
                foreach (SqlParameter p in param)
                {
                    command.Parameters.Add(p);
                }
            }
            command.Connection = conn;
            return (SqlDataReader)command.ExecuteReader(CommandBehavior.CloseConnection);
        }

        public DataTable executeSelectQuery(String _query, SqlParameter[] sqlParameter)
        {
            command = new SqlCommand();
            DataTable dataTable = new DataTable();
            dataTable = null;
            DataSet ds = new DataSet();
            try
            {
                if (conn.State == ConnectionState.Closed)
                {
                    conn.Open();
                }
                command.CommandText = _query;
                command.Parameters.AddRange(sqlParameter);
                command.ExecuteNonQuery();
                adaptr.SelectCommand = command;
                adaptr.Fill(ds);
                dataTable = ds.Tables[0];
            }
            catch (SqlException e)
            {
                 return null;
            }
            finally
            {
               // conn.Close;
            }
            return dataTable;
        }

        public bool executeInsertQuery(String _query, SqlParameter[] sqlParameter)
        {
            command = new SqlCommand();
            try
            {
              //  myCommand.Connection = openConnection();
                command.CommandText = _query;
                command.Parameters.AddRange(sqlParameter);
                adaptr.InsertCommand = command;
                command.ExecuteNonQuery();
            }
            catch (SqlException e)
            {
                
                return false;
            }
            finally
            {
            }
            return true;
        }

        public bool executeUpdateQuery(String _query, SqlParameter[] sqlParameter)
        {
            command = new SqlCommand();
            try
            {
               // myCommand.Connection = openConnection();
                command.CommandText = _query;
                command.Parameters.AddRange(sqlParameter);
                adaptr.UpdateCommand = command;
                command.ExecuteNonQuery();
            }
            catch (SqlException e)
            {
               
                return false;
            }
            finally
            {
            }
            return true;
        }

    }
}

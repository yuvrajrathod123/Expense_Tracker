import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div
        className="bg-dark text-white p-3 vh-100"
        style={{ width: "250px" }}
      >
        <h3 className="text-center mb-4">💰 Expense Tracker</h3>
        <ul className="nav flex-column">
          <li className="nav-item mb-2">
            <a href="#" className="nav-link text-white">
              <i className="bi bi-speedometer2 me-2"></i> Dashboard
            </a>
          </li>
          <li className="nav-item mb-2">
            <a href="#" className="nav-link text-white">
              <i className="bi bi-cash-stack me-2"></i> Transactions
            </a>
          </li>
          <li className="nav-item mb-2">
            <a href="#" className="nav-link text-white">
              <i className="bi bi-graph-up-arrow me-2"></i> Reports
            </a>
          </li>
          <li className="nav-item mb-2">
            <a href="#" className="nav-link text-white">
              <Link to="/login" lassName="bi bi-graph-up-arrow me-2">Login</Link>
            </a>
          </li>
          <li className="nav-item mb-2">
            <a href="#" className="nav-link text-white">
              <Link to="/register" lassName="bi bi-graph-up-arrow me-2">Create Account</Link>
            </a>
          </li>
          <li className="nav-item mt-3">
            <a href="#" className="btn btn-danger w-100">
              Logout
            </a>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1 p-4">
        <h2 className="fw-bold mb-4">Dashboard Overview</h2>

        {/* Summary Cards */}
        <div className="row mb-4">
          <div className="col-md-4 mb-3">
            <div className="card shadow-sm border-0">
              <div className="card-body">
                <h5 className="card-title text-success">Total Income</h5>
                <p className="fs-4 fw-bold">₹ 20,000</p>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-3">
            <div className="card shadow-sm border-0">
              <div className="card-body">
                <h5 className="card-title text-danger">Total Expense</h5>
                <p className="fs-4 fw-bold">₹ 12,000</p>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-3">
            <div className="card shadow-sm border-0">
              <div className="card-body">
                <h5 className="card-title text-primary">Balance</h5>
                <p className="fs-4 fw-bold">₹ 8,000</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="card shadow-sm border-0">
          <div className="card-header bg-primary text-white fw-semibold">
            Recent Transactions
          </div>
          <div className="card-body">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Description</th>
                  <th>Type</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>2025-09-20</td>
                  <td>Salary</td>
                  <td>
                    <span className="badge bg-success">Income</span>
                  </td>
                  <td>₹ 15,000</td>
                </tr>
                <tr>
                  <td>2025-09-21</td>
                  <td>Groceries</td>
                  <td>
                    <span className="badge bg-danger">Expense</span>
                  </td>
                  <td>₹ 2,000</td>
                </tr>
                <tr>
                  <td>2025-09-22</td>
                  <td>Electricity Bill</td>
                  <td>
                    <span className="badge bg-danger">Expense</span>
                  </td>
                  <td>₹ 3,000</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

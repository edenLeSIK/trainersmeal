import { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import InputComponent from "../components/ui/InputComponent";
import Button from "../components/ui/Button";
import styled from "styled-components";
import { membersData } from "../constants/member";

const Member: React.FC = () => {
  const [filterStatus, setFilterStatus] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredMembers, setFilteredMembers] = useState(membersData);
  const navigate = useNavigate();

  const handleFilterChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const status = e.target.value;
    setFilterStatus(status);
    filterMembers(status, searchTerm);
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    filterMembers(filterStatus, term);
  };

  const filterMembers = (status: string, term: string) => {
    let filtered = membersData;

    if (status) {
      filtered = filtered.filter((member) => member.status === status);
    }

    if (term) {
      filtered = filtered.filter(
        (member) =>
          member.name.toLowerCase().includes(term.toLowerCase()) ||
          member.goal.toLowerCase().includes(term.toLowerCase())
      );
    }

    setFilteredMembers(filtered);
  };

  const handleOrderClick = (id: string) => {
    navigate(`/bia`);
  };

  const handleMemberClick = (id: string) => {
    navigate(`/member/${id}`);
  };

  return (
    <Container>
      <div className="filter-search-bar">
        <select value={filterStatus} onChange={handleFilterChange}>
          <option value="">All</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
        <InputComponent
          type="text"
          placeholder="Search members..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <div className="table-container">
        <table className="member-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Gender</th>
              <th>Goal</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredMembers.map((member) => (
              <tr key={member.id} onClick={() => handleMemberClick(member.id)}>
                <td>{member.id}</td>
                <td>{member.name}</td>
                <td>{member.gender}</td>
                <td>{member.goal}</td>
                <td>
                  <div className={`status-indicator ${member.status}`} />
                </td>
                <td>
                  <Button
                    text="Order"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOrderClick(member.id);
                    }}
                    className="order-button"
                    color="main"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Container>
  );
};

export default Member;

const Container = styled.div`
  padding: 20px;
  height: 100vh;
  display: flex;
  flex-direction: column;

  .filter-search-bar {
    margin-bottom: 20px;
    display: flex;
    gap: 10px;

    select,
    input {
      padding: 10px;
      font-size: 16px;
      border-radius: 5px;
      border: 1px solid #ccc;
    }

    input {
      flex: 1;
    }
  }

  .table-container {
    flex: 1;
    overflow-y: auto;
    border: 1px solid #ccc;
    border-radius: 5px;
  }

  .member-table {
    width: 100%;
    border-collapse: collapse;

    th,
    td {
      padding: 10px;
      border: 1px solid #ccc;
      text-align: left;
    }

    th {
      background-color: #f4f4f4;
      position: sticky;
      top: 0;
      z-index: 1;
    }

    tbody tr {
      cursor: pointer;

      &:hover {
        background-color: #f1f1f1;
      }
    }

    .order-button {
      padding: 5px 10px;
      font-size: 14px;
    }
  }

  .status-indicator {
    width: 10px;
    height: 10px;
    border-radius: 50%;

    &.Active {
      background-color: green;
    }

    &.Inactive {
      background-color: red;
    }
  }
`;

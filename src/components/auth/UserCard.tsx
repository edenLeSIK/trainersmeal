import styled from "styled-components";

interface User {
  name: string;
  photo: string;
  gym: string;
}

const UserCard: React.FC<{ user: User }> = ({ user }) => {
  return (
    <Container>
      <div className="card">
        <img src={user.photo} alt={`${user.name}'s profile`} />
        <div className="card-details">
          <div className="info-row">
            <span className="info-label">이름</span>
            <span className="info-value">{user.name}</span>
          </div>
          <div className="info-row">
            <span className="info-label">소속</span>
            <span className="info-value">{user.gym}</span>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default UserCard;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;

  .card {
    background-color: #e0f7fa;
    padding: 20px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    max-width: 400px;

    img {
      border-radius: 10px;
      width: 80px;
      height: 80px;
      object-fit: cover;
      margin-right: 20px;
    }

    .card-details {
      h2 {
        font-size: 20px;
        margin-bottom: 10px;
      }

      .info-row {
        display: flex;
        justify-content: space-between;
        margin-bottom: 5px;

        .info-label {
          font-weight: bold;
        }

        .info-value {
          color: #555;
        }
      }
    }
  }
`;

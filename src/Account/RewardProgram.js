import { useState } from "react";
import { connect } from "react-redux";
import Button from "../Shared/UI/Button";
import Header from "../Shared/UI/Header";
import Input from "../Shared/UI/Input";
import Loading from "../Shared/UI/Loading";
import AccountRequests from "../Requests/AccountRequests";
import {
  fetchUpdatedTrips,
  fetchUpdatedAccount,
} from "../Redux/Operations/AccountOperations";

const DEFAULT_FORM_DATA = {
  name: null,
  membershipId: null,
  id: null,
};

function RewardProgram({ fetchUpdatedTrips, fetchUpdatedAccount, ...props }) {
  const [formData, setFormData] = useState(DEFAULT_FORM_DATA);
  const [error, setErrorStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const accountRequest = new AccountRequests();

  const handleChange = (event) => {
    const targetKey = event.target.name;
    const newValue = event.target.value;

    setFormData((prevState) => ({ ...prevState, [targetKey]: newValue }));
  };

  const onSave = async () => {
    setLoading(true);
    setErrorStatus(false);

    if (!formData.name) {
      console.error("Save failed: Program name missing.");
      setErrorStatus("Please provide the program name.");
      setLoading(false);
      return;
    } else if (!formData.membershipId) {
      console.error("Save failed: Membership id missing.");
      setErrorStatus("Please provide the membership id.");
      setLoading(false);
      return;
    }

    accountRequest
      .addRewardProgram(formData)
      .then(() => {
        fetchUpdatedAccount().then(() => props.navigate("/profile"));
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="content-body">
      <Header title="Add Reward Program" leftIcon destination={"/profile"} />
      <div className="container">
        <div className="row">
          <Input
            name="name"
            onChange={handleChange}
            placeholder="Reward Program"
            label="Reward Program"
            value={formData.name}
          />
        </div>
        <div className="row">
          <Input
            name="membershipId"
            onChange={handleChange}
            placeholder="Rewards Number"
            label="Rewards Number"
            value={formData.membershipId}
          />
        </div>
        <div className="row mt-3">
          <div className="col d-flex align-self-center">
            <Button label="Save" onClick={onSave} />
          </div>
        </div>
        {error ? (
          <div className="row">
            <div className="b13-mon text-center error-color py-2 px-3 mt-3">
              {error}
            </div>
          </div>
        ) : null}
      </div>
      <Loading loading={loading} />
    </div>
  );
}

function mapStateToProps(state) {
  return {};
}

const mapDispatchToProps = {
  fetchUpdatedTrips,
  fetchUpdatedAccount,
};

export default connect(mapStateToProps, mapDispatchToProps)(RewardProgram);

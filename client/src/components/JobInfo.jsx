import Wrapper from "../assets/wrappers/JobInfo"
import Job from "./Job"

const JobInfo = ({icon , text}) => {
  return (
    <Wrapper>
      <span className="job-icon">
        {icon}
      </span>
      <span className="job-text">{text}</span>
    </Wrapper>
  )
}

export default JobInfo
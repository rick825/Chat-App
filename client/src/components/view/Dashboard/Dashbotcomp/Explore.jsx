import { useDashboardProvider } from '../../../../context/DashboardContext';
import { useLoginStatus } from '../../../../context/LoginContext';
import { toast } from 'react-toastify';
import axios from 'axios';


const Explore = () => {
  const { groups, makeFormVisible, setEditGroup,setRefresh, refresh } = useDashboardProvider();
  const {loggedInUser} = useLoginStatus();

  const setFormVisible= (value,group) =>{
     makeFormVisible(value);
     setEditGroup(group);
     console.log("Edit Group->",group);
  }

  //join Group
  const handleJoinGroup = async (group) => {
    try {
      axios.post('/api/joinGroup', { group, loggedInUser }, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          if (response.status === 200) {
            setRefresh(!refresh);
            toast.success(`You have joined the group ${group.name}`);
          } else {
            toast.error("Error While Joining Group");
          }
        })
        .catch(error => {
          toast.error(error);
        })
  
    } catch (error) {
      console.log({ Error: "Error Joining Group" });
      toast.error("Error While Joining Group");
    }
  }
  

  //deleteGroup
  const deleteGroup = (group) => {
    try {
      console.log("Group to be Deleted", group);
      axios.post('/api/deleteGroup',{group}, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          if (response.status === 200) {
            setRefresh(true);
            toast.success(`${response.data.groupName} Successfully Deleted`);
          }
        })
        .catch(error => {
          console.log("Error while Deleting", error);
          toast.error("Error While Deleting");
        });
    } catch (error) {
      console.log("Error while Deleting", error);
      toast.error("Error While Deleting");
    }
  }

  //leave Group
const leaveGroup = (group) =>{
  try {
    console.log("Group to be left",group);
    axios.post('/api/leaveGroup',{group,loggedInUser},{
      headers:{
        'Content-Type' : 'application/json'
      }
    }).then(response=>{
      if(response.status === 200){
        setRefresh(true);
        toast.success("Group Left Successfully")
      }
    })
    .catch(error=>{ 
      console.log("Error while leaving group",error);
      toast.error("Error While Leaving group");
    })
    
  } catch (error) {
    console.log("Error while Leaving", error);
      toast.error("Error While Leaving");
  }
}
  
  

  return (
    <>
      <div className="bot-comp explore">
        <div className="bot-comp-head">
          <h2>Explore:</h2>
        </div>

        <div className="explore-main">

        <div className="bot-comp-main user bgcolor2">
          <h2>Find Friends:</h2>
         <div className="bot-comp-group bot-comp-user">
         
              <div className="bot-comp-box user-card" >
                <div className="user-top">
                  <div className="user-photo">
                  <img  src="https://img.icons8.com/pastel-glyph/64/user-male-circle.png" alt="user-male-circle"/>
                  </div>
                  <div className="user-name">
                    <h2>Akash Kumar Das</h2>
                  </div>
                </div>
                <div className="user-button">
                  <button>Add Friend</button>
                </div>
              </div>

              
           
          </div>
        </div>

         
        <div className="bot-comp-main group bgcolor2">
          <h2>Join Groups:</h2>
         <div className="bot-comp-group">
          {groups.length > 0 ? (
            groups.map((group, index) => (
              <div className="bot-comp-box" key={index}>
              
                <div className="box-top">
                  <h3>{group.name}</h3>
                  <p>Joined: <span>34</span></p>
                </div>
                <div className="box-mid">
                  <p id="topic">Topic: <span>{group.topic}</span></p>
                  <p id="participants">Total Participants: <span>{group.participants}</span></p>
                  <p id="organiser">Organised By: <span>{group.owner && group.owner.fname} {group.owner && group.owner.lname}</span></p> {/* Display owner's name */}
                </div>

                <div className="box-bot">
                  {group.owner._id === loggedInUser._id ? (
                  <div className="box-bot-icon">
                  <button className="Join">Organised</button>
                  <img onClick={()=>setFormVisible('edit',group)} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAACJUlEQVR4nO3ZS2/TQBAH8CkPZ4eCQEIVIswmEiqvcqR3rr1ysDyTRhRx4AvwAcoJjohPwo0TolJbPgNcOPFoTxwqrhS0xJaS1MWJ7X1E2r+0UmLH1v7i8SjeAMTE1MjDc4p4G4k/oeYjJN6/QLwBC5UHz84rzW9Ry5/Jwb8XCtPRgycnEfkg+QgLkKXihSJ5XY7hXxB0rg2XkeS90llWbELiVyWQzxBsVtKLSLw3Kh3+AmtpctqVUcTPIXSE0vy1Q8PV6Y8UGNMAANKzEDZCvp1AjF8ZzVumm5Wex3SAU7uDvfFiFkSHhqumzJD4UeUXEgoiuSG3phGmzPKb+8N4N/svBFx3Jy07oxtXDpJ+dm98t0EZXH7j78PVp5cqz+kcYgPhHGIL4RRiE+EMYhvhBDKJOLSCsA6ZRvQ212ZBYNGig4A0QGCd+ViB1EQ0mk/rkAaIcCBViG52u+rGRu+QWRAk36u6E3qFtITwC2kR4Q/SMsIPxALCB2QJSXZHCP6R9OXu+E7z3mzPEXvmIcryfKDWgZ3e4GZ+3DFqXm8L4RyCvUE6seqXl03S3bxTp5z8QUheTjyH/1vA4PWmCOcQpeVdyaLCcd1y8gchOSxdIWmIcApR19Ne3q1+mhJSJG+UlsfLmu8DbJ+ZewIN51P7wMv9rSuqm2mwFPT+o7GlYIToeEWsBGNp6VhaVoKxtHQsrTBLCwMbMDek+G87pEGyOzckBsLIXzQazsHejU2sAAAAAElFTkSuQmCC" alt=''/>
                  <img onClick={() => deleteGroup(group)} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAADMklEQVR4nO2Zz0uUQRjHHyHXeXY1K8vF3Zl369APpCiQCLsUdauUIHffZ15XFjp4DDuFHYIOJmFdwv6AjOyWdItOYZfKbtEhyChIMSIjpDQ0irHd951EwfQZS9gvzOmFz/M888w888y8AGWVVRabUFIvSj2DSv9cdJhvknrhfxUq/W1J56Px9Z85WJPqqJufZaVfodTfl+Hs8oacZxnmlY0yu8WJ8wkZ7BNSj7E5vcQQSr9PyNxeVudrvWAzKv3OtfMYZoTeGptsAaDUA9YMfUJFrdCYjbEZaMzGUOrTQtKktawGWNiodMuCGWphAS9qi1pZbdVmCpvMmrRSewscC5W+HWZb0viKN7WpCChpes3WvVpyP0yjpJ6/9b8ClZ76586rcEytIAPUs54zECru0cmoAtEDcCyU+mHJXjytT6waGE8FB6wS+gIcCyW9jALI7V81sLpBb7WqwmdwLJT0pWTPtC4czAp7L8C2bDW4Ut3ZGnvtG9ssXJQ0WgLHUv4ucKRYRu+xTuLXbGCUergErvLoGDhSlecfjyoQPWIDo9KD4T7w/A5wJKGoYJXQO2xgVLrPKqXd4EhC6YtWAFfZwKioyyql/eBIQtHNMACPzrGB0aM2KwND4EhC6vthAGl9hg+c0s3RWaBH2MALJCQ9jwKgQ8AlkfKVdZiNs4EXSEg9EQXQLoFPRzag0nPF8vYDmjorgVtNnZWGXQxgzthk5ZuZD7OQ8hUrHADE9iBjLdMxF+kdiQLQzex8zz9sFYqnLkrckFXi2hzwc1apvufikOm3jvkubj4qOm8FcAMczFC3dUr2cfNR6WtRuxJcAAdrtMMKYJCbj4ruhgGkKc/NB9OFWq3uMDcfJT0OO960f5SbD7FU+27rsjHKzUdJb8I7R1rv5OYDJPMJKwMzbLel36qw/ytAw6k4uJC5E5eMJJL5ei5uIpmvt1qVSXAloehZZMgP2Lhpylsl9Am4Eiq6bM3Uh/nH10xBrBiYKQjzoCsUfbTaiEvgSuaZ44+OkXkISeOs/wUWE8rcweLsMzuvJ+Je0ARrocQOSqKk68XnltlVOD5rnk/MKcxZFMoqqyxYP/oFsXq5x0vwXNgAAAAASUVORK5CYII=" alt=''/>
                  </div>
                  ): (
                    <>
                    {group.members.memberId.includes(loggedInUser._id) ? (
                      <div className="box-bot-text box-bot-icon">
                         <button className="Join" >Joined</button>
                         <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAADZ0lEQVR4nO2ZbWiNYRjHf2wzso2JL15bM6xRLMUHIZ8sHzSaDeWbIkQib0l8GnkbnwhfSMSymnknSt4ZNkNoZWMjCduwiemq/6mn7Zyzs51znvOs9qunTs/9dt3nvu7rue7/DT300INbjAAWALuAYqAceAd80mO/n6hsJ5AHDMcjjAZ2ABVAa4Dnm55A5c+B7erLdaYDl4C/MuYf8AjYBxQAk4CBftrZu2xgIbBfK+SbkPV1EZjmxgTsX7vgGPwNsA4YGUafo4D1wFtHv+eBdKJAL2At8FMDvQBy9T5S9AbmA1UaowlYHckxkoCzjs5tQnFEj3itkO9POyMbwmIQcN+xCmNxj0zgpca+B6R2taMUhVDr6AqQjPskA9dkw+Ou2BCnCOLbeInEjr4OW8o669Zb1dBCan9iT5LDOzaF2mgi0AJ8B9LwDunAD6AZmBBKA59PLsV7LHfs2aDMVMVnUQ6xXSUOqJSNll0EpFiV8vEui2Tj6UAVBmhv1AEJeJc+yqabA4XjPM30MN7nqGyd569wrwptQl4nX7bu9ld4VYVj8D7jZOtlf4W+vCaU/TEHqAVqgBwX6zn3Sasy5XZ8BBoJjRrH2eG9i/WcWCb+AT/UKnXu9hOpUEeWpHVEjga3QWe7WC8k1/Jt9gy8T2awzV6oQvtyep2CYOE3V4WH8D7HZKvZ3A47dzQAX+SDXiUR+Az8DnZiPKGZ2tJ5lcWy8VSwStkS26o8msbHSwRpDUXIO6eKK/AeK2WbqZwdkqa90uSxvCtDmYel71mhNlqmmVcG0HDdJkWnVrNpQ2cbH1HDWzFWUvrpjG62lEpa7RQJDj3JlL7BxGYlbsiGh+FIp4mOc7yp5VNwjyzglca+GwkXj1MqYGH5D7CF6IfYjcAvh8gQtojtZK46ric6mO/bh/i1xmlUuI04QzXA7Qj3m6YVqHacSUqiqXL69KSiAOWbgT3AEsmuqX4uaeyaYrLSjAPA0zZXb6XAVKJMmQac5ceni4JcdjZIRw5UbuL0Nrd05mHa6NVt4rhd/NyUQXW65DQ3OalIU6XjaL2upx/oBqpQmpS5q6sclLH2xTeGSAdrcRw53bzN6hLjZXCj7g9LlO/4XON4pMNjNLBvyB0/fm3flOvADLoJq4CvUjjK5d9ruolA0QOx5D+isClYdLLnzQAAAABJRU5ErkJggg==" alt=""/>
                         <img onClick={()=>leaveGroup(group)} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAABNklEQVR4nO3aMU4DMRCF4R8KWiRofRHEwWi3gcBNOEEaxAEoAhR0tCzXcGTJkdAqGzyJgt4MfpJLS/NpdtdrywBnwAPwDWSRMQKLWltz7gUKnxt3FshYJ12hk+sfnWnORq+WbK2rQ46c3Dsiltw7IpabKB0pGQgCMaVDjphHYAmce+/Iqtb0YsEoQhLwWesqqAuvkL0wqpAp5vU3jDLEhFGHbMNc4hTShPECmWLephhPkJ0Yb5BZzCGQE+Bd4NhodSjktL547iFhHi2pz3B2BEm71hIvkBRhQUwt/1vqkNT6O68MSZY9iSokRdhYpShb3Y8ohw/PwFOE46C90iF/kCFCRwZrXaqQ3CFiyb0jYsn/tiNjnVAusqhdqvmyTFoIHOfMjVsLpFzuKphNZxRG6URBNF88WwOccZGxk5w4qAAAAABJRU5ErkJggg=="  alt="" />
                      </div>
                    ) : (
                      <div className="box-bot-text">
                        <button className="Join" onClick={() => handleJoinGroup(group)} style={{ padding: '1rem 10rem' }}>Join</button>
                      </div>
                    )}
                    </>
                  )}
                </div>

              </div>
            ))
          ) : (
            <div className='message'>
              <h2 style={{fontWeight: '200'}}>No Groups Found</h2>
            </div>
          )}
          </div>
        </div>
        </div>

      </div>
    </>
  );
};

export default Explore;

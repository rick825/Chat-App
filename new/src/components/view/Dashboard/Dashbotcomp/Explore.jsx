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
      axios.post('/api/joinGroup',{group},{
        headers: {
          'Content-Type': 'application/json'
        }
      })
       .then(response=>{
          if(response.status === 200){
            setRefresh(!refresh);
            toast.success(`You have joined the group ${group.name}`);
          }else{
            toast.error(response.data.error)
          }
       })
       .catch(error=>{
        toast.error(error);
       })

    } catch (error) {
       console.log({Error: "Error Joining Group"});
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
                    <div className="box-bot-text">
                      <button className="Join" onClick={()=>handleJoinGroup(group)} style={{padding:'1rem 10rem'}}>Join</button>
                    </div>  
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

import Dashform from "./Dashform";
import { useDashboardProvider } from "../../../context/DashboardContext";
import EditGroupForm from "./EditGroupForm";

const Dashtop = () =>{

  const { makeFormVisible} = useDashboardProvider();

  const formVisible = (value) =>{
     makeFormVisible(value)
  }

   return(<>
     <Dashform />
     <EditGroupForm />
     <div className="Dashtop dashcont">
       <div className="dashtopbutton ">

          <div className="dashButton dashtopcont bgcolor2">
            <div className="btn btn1">
                <p>Explore</p>
            </div>
            <div className="btn btn2" onClick={()=>formVisible('create')}>
                <p>+ Create Room</p>
            </div>
          </div>

          <div className="dashmid dashtopcont bgcolor2">
          <div className="btn btn2">
                <div className="btnleft">
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFIUlEQVR4nO2Ya1BUZRzG9xO4h0uBeEGQc1iWYJc7yHJb7pddo/CS6wUQRPec3WVYR6WL2kUt06yoKLsoltrN7WKpESVZiSWCiYBgM/ShGvtS32pgpj7xNO8hkL2wezy7qzsTz8wz7Aznnfk97/n//+87RyKZ1axmdeuSm/2lDLeZovU9FMON8aa5ngCGM5P/SXxZ0khDhJTWD1AMC4rhphwQPWlDP3lG4rM7TzuFn3S/T74JKSkb1/CTbpL4miia7RUGbyR/L9mu15p/8tcYr20u1V/tKWzoHlPXdI3lrOnsyVzVbpZrO7z/xiiaHRUGzwcYnb620jASoTEND5SxV1HUcAn5tV3IWdsJ1ap2pC8/iaTKE/0plccibksAV/CBMj7AX1Y77wQ+ufIEEjTHEFdyqF+ubfX3agkJgecDyExTJUTKxiV86WHICw4iOq/Fe71D5rwQ+ECZyaqJy9i+XiHwTG4LIjP32fWO5yQ3+5MR6Qo+UGbslyh1fpPLijZcGhUEr9qP8LTdVr3jcZFD6mYIx/DSWOuDTF3bNSoQHvOSdkz1jvek1PmREiGjkkybCZu6+bKZtvOTylnT2SsMfidCFM1eLCGRInNeCHyoohnBsU2+dwCSQ4rMeVfwQfImq97xjuj6OQFR+hqKZi0UzY5QDDvGm/ymWUsAzVWTZ2yXkUOKn/NO4KU2veNxUYy+jqLZGxP3ISeeeGa97XqlcpcfmfNkVJJpE5a0YzRUsa2bLxuv7rxS5ydl2CMuwW0spfVt3i8JAaJo9pBwcM7KUoY7KrmTohg9JxR2RkcZNhXW/zJH2zhco2kctmhMwyNa0/UxrXF4rMI4NKIxDloqjIPV5BmPwofKzcFSWv/HLcE6cEBM45/lbN9vGtMQNMZrqCA2DKKcG0A51w9yTypj+1Civ3KjeONlu94RLYrhOLfApy5+HH8GTIct1V9Bqf4HlGy6jJKNl1G8sRfFDT38ha+o/mKbUjfsfu9IGa5dDKwjR2budQy7oRuF9RdRWP89Cuq+Q0HdBeSvvwB1zXn3e4eiuV/FwDpyqLJ5Rtj82i6oa89DXfMt8mq+QV7118hddw551ec2uRmA/UcMrL0NCIppdAqbu+4r/raas/YsstecRfbqL6HSdfyeW3UqSHQAsbAz2Rls1uovkKXrgEr3OX9rzVz1GTIfOIOMlafFvwV3YB3ZFeySlad5Z6w4hYwVnyJ9+SdIrzp5xkMBDG7bJeyyk0hb9jHSqj5CatWHSL3/A6RUWn52I4D70NPtEvY+Ygs/cpMr30fSve8haem7f/tMAAGwSFz6DhK1byNBexwJmuNQVhyDzwQQAqusOApF+VtQlL+J+LIjiC9t85UARkGwcaWHyfch3ENc/AZii1+/EwGMDi0ENrboNcgLX4W88CBiCl5BTMHL3g5gFGwhsLL8VsjUrYhWv4TovBfB5L3gyQBGtywElsltAZ3zPOic50BnP4uo7APuBHAP+Ob3ogk7g436DzYq6wAWq57BYtV+8pUOkZlP354AtrCObLuzUQ5gI5bsRUTGU1iU8SQWpe9BePoezwcQAuvIQmDD03ZjYeouLEx9AgtSHseClMfcCjAuFtbejYJg5yc/ivnJO8knRsxL3I6wxO3j4gPIDD+KgzXZOVhuFgKLsIRHMDfhYcxVPoRQxYMIid92XXSAIIbLCow2DAXKnL0Je1h7+CYezBVsqKKZACMkfivujtsyflfslqHg2K0q0QFmNav/gf4FggkKdISCY9IAAAAASUVORK5CYII=" alt="" />
                </div>
                <div className="btnright">
                  <h3>My Friends</h3>
                  <h2>10</h2>
                </div>
            </div>
          <div className="btn btn1">
                <div className="btnleft">
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAADcklEQVR4nO2aTWgTQRSAt0rbzCSliopWbN4kjRYiXsxRjz14EUTISbGavDeBonj0IlrBg1ePvepNj0VUvKqngiAI/kGLB6milVqlVauVlzTJJtkku5vdZKN5MLBJdmffN2/em3lvYhg9+U9kcCybEIDXip/5mr8zukGGYXKbVHhGAD6Siv5IRRvF3/h6s80JRRcjiXO7jGBJems4RhMC8JZU+N2kcL4V76r+XgL9EECzIqbTRjI90DH1ZRRTEvCmAPxQo6QdEFMTir7wQIRjNGEYRp/vyofGzo5KhZck0KtGijkFqbLUggC64bk/bY/r4ep576Q5BlEVreBPB/ROD+Y9fXOphBcgGwUr4VrJn1K6v6n64VE8yGYVQIstvdhrEGX2J1ySQDOhuD5qCSGAHnj1Mj9BZCXU/RoQP17kN4g09d8Dkf+SRQTQV3a8/OLoGgSfdhJkTirUO8YzQ82et/N7SGUgv9AqfOs7SHn09WGrqNcKSO3Wh2YE4LL3IDGNRnIqYgXgNUhJRrQMR/FUs2XBqBZHN7cDxCQ9ENmzCPWmViORPWdXNiNLSvcLyJ4Uiu51ZdQaUplxu3lL8EBgMsQZmtOUN1Ag0sGWIdggyn3rehAB9FIqulLuHy8LhS+6AkQo+mwqDPQ1KHBMF7fswQEBXBFAtyXoY1xGKvbHuYpUelIAPuTG1+b8hUFD0eyRToOsS0WPObmq3N6b6mGAKxbPrbqp90qvQQpznEumU3vc1IGr+lqyW++VnoAAveE5PRDP7TffH4nmkkLhdalwvnX/wnnuKxLNJa1B8Em9tashSD2nFaOZvVyLLUyr1oNDPasLoOnBKMaqC+j8bqHoWTOQVav6armITbMS8JdfABZW+s0DZlXELpV2Fb6vtZ/ZaRMXBgXoExLoLgO2T3mq11ZZF9aJdSsrXY6SJrm6hadSwWnpYwCU32h0KCRi2eN1QTiCSMA7EvBnpxWWDaYcb1zzLmANYvKXqB7ZPJlaCIwlgBbzJ1mQU4ZzMVmpsAh2AmKOg42tAx47IhK4j8Oik0XP/ejjMof/cFwfMnyTZHrATYLlYPS1sft02GinlFJehZ9cKw+4xlN3c6vSYalMg+0CvOaA0sKJrb9SrKbX2f2uF0InrwFt+GOAF8JbGxGj8wLwuQR6x9ki79U86bwnRvDlL7nPQwji/lnGAAAAAElFTkSuQmCC" alt="" />
                </div>
                <div className="btnright">
                  <h3>My Rooms</h3>
                  <h2>42</h2>
                </div>
            </div>
            <div className="btn btn3">
                <div className="btnleft">
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAACm0lEQVR4nO2Wy2sTQRzHFwW7U/CBXppa/wgVRPCx81g14KMVCc60iGJBUmz1ok32FIIIm0hrZ/+BDXjr2cdJ68nUkwhSryJeRDxo2oO9jMwmpiFN9pWkLDIf+EHYzP7m+535zW9W0xQKhUKhUPxHcJ4eqpTwfdcmq66N1+tBVt0ymZP/aUnmmW2MuTb5WCkR0TFs/KGygA9rSYTz9JCv+BYTidwJ1yb3AsVvmZjVkoZbIu9DGyjh6o6KA3ByHCD6FkC67gViKwCzy20GamENyLFR88cGIGoDxETnoI9jGbDxr6j5Y1FfmW7J6zFsTF6KW0IgQv54BuS2BkwAIH3jGSiTuaiHGETIH9MAqwVOgOjv5gUm+3yINrpcyOyJmj8WoSaAtFnP8pLyNdF2kYGI+eMYWAmegL1ufUeuriwRWefyYHth43fy2b+V7yV/JGQrCzxkkF5Man4P2cp8VueR1iNgwPk9ZCuT3aBRszW5rT2vzA7mD0WhUNh1znJOEct5QvJOlVj8O8k7f7yo/66aeV6WY+RYLSlkMsu7seVMkzz/alqOCBNyLMnx2/LdgYoDJh0FmM3qiL0CiH5ubjFiazpkL1NXs0Wc42thhbcHzvFPqWvZYrf8ANK7UkNk4XvJjUM6ZA5AdLPbARudmBFw/mks4a2B5hdFamLG7yLb1BHj+85nDoYSP3yWHgWQfvFrbSPjWYFzSz2LN5s7sSRGrtzxbac6ZN8AZif8S8aYOhl0Ox5I3xLw4WLfxJuNMB4siP0XbgZdahu6wU53FK+fuX5Eh+xn0MVyPFvsu3izEceyxYDvIiZ0RH8AY2psuwFIXwR/WLGBiTcbEUaDjtjz7eUT4sWkGACICWXAVDvg9LeEFAqFQqFQKLTI/AXKnZ+98AL6nwAAAABJRU5ErkJggg==" alt="" />
                </div>
                <div className="btnright">
                  <h3>Joined Rooms</h3>
                  <h2>42</h2>
                </div>
            </div>
            
          </div>

          <div className="dashright dashtopcont  bgcolor2">

          </div>

        </div>  
     </div>
   </>)
}

export default Dashtop;
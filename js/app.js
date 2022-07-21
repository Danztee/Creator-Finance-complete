const dropList = document.querySelectorAll(".sel-img select");

const dailingCode = document.querySelector(".code");
const btn = document.getElementById("btn");
const phoneNo = document.getElementById("phone");

async function country() {
  try {
    let res = await fetch("https://restcountries.com/v2/all");
    let data = await res.json();
    console.log(data);
    data.forEach((country) => {
      for (let i = 0; i < dropList.length; i++) {
        let selected;
        if (i == 0) {
          selected = country.alpha3Code == "NGA" ? "selected" : "";
        }
        let optionTag = `<option value="${country.alpha2Code}" ${selected}>${country.alpha3Code}</option>`;
        dropList[i].insertAdjacentHTML("beforeend", optionTag);

        dropList[i].addEventListener("change", (e) => {
          let element = e.target;

          if (country.alpha2Code == element.value) {
            phoneNo.value = "";
            let imgTag = element.parentElement.querySelector("img");
            imgTag.src = `https://flagcdn.com/w40/${country.alpha2Code.toLowerCase()}.png`;
            dailingCode.textContent = `+${country.callingCodes}`;
          }
        });
      }
    });

    btn.addEventListener("click", () => {
      console.log(dailingCode);
      console.log(phoneNo.value);
    });
  } catch (error) {
    console.log(error);
  }
}
country();

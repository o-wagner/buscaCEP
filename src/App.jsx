import { useForm } from "react-hook-form";
import "./App.css";
import Footer from "./components/footer";
import Header from "./components/header";
import Icon from "./assets/img/icon.png";

function App() {
  const { register, setValue, setFocus } = useForm();

  function consultaCEP(e) {
    const cep = e.target.value;
    console.log(cep);

    if (cep.length !== 8) {
      return;
    }
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setValue("cidade", data.localidade);
        setValue("estado", data.uf);
        setValue("bairro", data.bairro);
        setValue("rua", data.logradouro);

        if(data.logradouro){
          setFocus('numero');
        }else{
          setFocus('rua');
        }
      });
  }

  return (
    <div className="container">
      <Header />
      <main className="main">
        <form className="form" action="#">
          <div className="icon">
            <img src={Icon} alt="icon" width="13%" />
          </div>

          <div className="field">
            <span>CEP</span>
            <input
              type="text"
              name="cep"
              className="input"
              maxLength={8}
              placeholder="Insira seu CEP"
              {...register("cep")}
              onBlur={consultaCEP}
            />
          </div>

          <div className="row">
            <div className="field">
              <span>Rua</span>
              <input
                type="text"
                name="rua"
                className="input"
                {...register("rua")}
              />
            </div>

            <div className="field">
              <span>Número</span>
              <input
                type="text"
                name="numero"
                className="input"
                {...register("numero")}
              />
            </div>
          </div>

          <div className="field">
            <span>Bairro</span>
            <input
              type="text"
              name="bairro"
              className="input"
              {...register("bairro")}
            />
          </div>

          <div className="field">
            <span>Cidade</span>
            <input
              type="text"
              name="cidade"
              className="input"
              {...register("cidade")}
            />
          </div>

          <div className="field">
            <span>Estado</span>
            <input
              type="text"
              name="estado"
              className="input"
              {...register("estado")}
            />
          </div>
        </form>
      </main>
      <Footer />
    </div>
  );
}

export default App;

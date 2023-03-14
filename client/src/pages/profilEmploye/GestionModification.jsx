import { useSelector } from "react-redux";
import Formulaire from "../../components/formulaire/Formulaire";
import PageName from "../../components/pageName/PageName";
import TableM from "../../components/table/TableM";
import { DMEntries, userButtons } from "../../data/formData";
import { columnsDemandes, filterDemOptions } from "../../data/tableCols";

const GestionModification = () => {
  const demandes = useSelector((state) => state.auth.demandes);
  const demandesM = demandes.filter((dem) => dem.__t === "DM");

  const currentUser = useSelector((state) => state.auth.user);
  return (
    <div className="gestion">
      <PageName name="Modification Reports" />
      <div className="elements">
        <Formulaire
          type="DM"
          entries={DMEntries}
          buttons={userButtons}
          title="Leave a change request"
        />

        <TableM
          title="Modification Requests"
          search={["id", "name"]}
          data={demandesM}
          columns={columnsDemandes}
          filterOptions={filterDemOptions}
          colType="demande"
        />
      </div>
    </div>
  );
};

export default GestionModification;
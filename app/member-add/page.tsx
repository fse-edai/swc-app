"use client";

import { useEffect, useState } from "react";

export default function MemberAdd() {

  const [member_name, setMemberName] = useState("");
  const [shinsei, setShinsei] = useState("");
  const [birthday, setBirthday] = useState("");
  const [hosoku, setHosoku] = useState("");
  const [parts, setParts] = useState<any[]>([]);
  const [teams, setTeams] = useState<any[]>([]);
  const [selectedPart, setSelectedPart] = useState("");
  const [selectedTeam, setSelectedTeam] = useState("");
  const [errors, setErrors] = useState({
    shinsei: "",
    member_name: "",
    parts: "",
    teams: "",
    birthday:"",
  });

  useEffect(() => {
    fetch("https://swcbbl.com/nxphp/getPart.php")
      .then(res => res.json())
      .then(data => setParts(data));
  }, []);

  const handlePartChange = (e: any) => {
    const partno = e.target.value;
    setSelectedPart(partno);

    if (!partno) {
      setTeams([]);
      return;
    }

    fetch(`https://swcbbl.com/nxphp/getTeamByPartno.php?partno=${partno}`)
      .then(res => res.json())
      .then(data => setTeams(data));
  };

  const handleSubmit = () => {
    const newErrors: any = {};

    if (!shinsei) newErrors.shinsei = "申請者を入力してください";
    if (!member_name) newErrors.member_name = "選手名を入力してください";
    if (!selectedPart) newErrors.parts = "部を選択してください";
    if (!selectedTeam) newErrors.teams = "チームを選択してください";
    if (!birthday) newErrors.birthday = "誕生日を入力してください";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    // OK
    alert("登録OK！");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 space-y-5">

        <h1 className="text-xl font-bold text-center">選手追加登録</h1>

        {/* 申請者 */}
        <div>
          <label className="text-sm text-gray-600">申請者</label>
          <input
            name="shinsei"
            value={shinsei}
            onChange={(e) => {
              setShinsei(e.target.value);
              setErrors({ ...errors, shinsei: "" });
            }}
            className={`w-full p-2 border rounded ${
              errors.shinsei ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.shinsei && (
            <p className="text-red-500 text-sm mt-1">{errors.shinsei}</p>
          )}
        </div>

        {/* 部 */}
        <div>
          <label className="text-sm text-gray-600">部</label>
          <select
            name="partno"
            value={selectedPart}
            onChange={(e) => {
              handlePartChange(e); // ←これ使う
              setErrors({ ...errors, parts: "" });
            }}
            className={`w-full p-3 border rounded-lg ${
              errors.parts ? "border-red-500" : ""
            }`}
          >
            <option value="">選択してください</option>
            {parts.map((part: any) => (
              <option key={part.partno} value={part.partno}>
                {part.name}
              </option>
            ))}
          </select>
          {errors.parts && (
            <p className="text-red-500 text-sm mt-1">{errors.parts}</p>
          )}
        </div>

        {/* チーム */}
        <div>
          <label className="text-sm text-gray-600">チーム</label>
          <select
            name="teamno"
            value={selectedTeam}
            onChange={(e) => {
              setSelectedTeam(e.target.value);
              setErrors({ ...errors, teams: "" });
            }}
            className={`w-full p-3 border rounded-lg ${
              errors.teams ? "border-red-500" : ""
            }`}
          >
            <option value="">
              {selectedPart ? "選択してください" : "先に部を選んでください"}
            </option>

          {teams.map((t: any, index) => (
            <option key={index} value={t.teamno}>
              {t.name}
            </option>
          ))}
          </select>
          {errors.teams && (
            <p className="text-red-500 text-sm mt-1">{errors.teams}</p>
          )}
        </div>

        {/* 名前 */}
        <div>
          <label className="text-sm text-gray-600">選手名</label>
          <input
            value={member_name}
            onChange={(e) => {
              setMemberName(e.target.value);
              setErrors({ ...errors, member_name: "" });
            }}
            className={`w-full mt-1 p-3 border rounded-lg ${
              errors.member_name ? "border-red-500" : ""
            }`}
          />
          {errors.member_name && (
            <p className="text-red-500 text-sm mt-1">{errors.member_name}</p>
          )}
        </div>

        {/* 生年月日 */}
        <div>
          <label className="text-sm text-gray-600">生年月日</label>
          <input
            type="date"
            value={birthday}
            onChange={(e) => {
              setBirthday(e.target.value);
              setErrors({ ...errors, birthday: "" });
            }}
            className={`w-full mt-1 p-3 border rounded-lg ${
              errors.birthday ? "border-red-500" : ""
            }`}
          />
          {errors.birthday && (
            <p className="text-red-500 text-sm mt-1">{errors.birthday}</p>
          )}
        </div>

        {/* 補足 */}
        <div>
          <label className="text-sm text-gray-600">補足(大学名/国籍等/チーム名)</label>
          <input
            name="hosoku"
            className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>

        {/* ボタン */}
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-500 text-white p-3 rounded-lg font-bold hover:bg-blue-600"
        >
          登録する
        </button>

      </div>
    </div>
  );
}
import { expect, describe, it, vi, afterEach } from "vitest";
import { getLawData } from "@/lib/api/get-law-data";

const xml = `
<lawdata_response>
  <law_full_text>
    <Law ADYear="2001" AmendmentPromulgateDate="2023/03/30" Category="行政組織" DataInfo="230410e81k80m01" EnforcementComment="" EnforcementDate="2023/10/01" Era="Heisei" Lang="ja" LawId="413M60000080001" LawType="MinisterialOrdinance" LawTypeNum="5413001" Mission="New" Num="001" OriginalPromulgateDate="2001/01/06" PromulgateDay="06" PromulgateMonth="01" RemainInForce="" RepealType="" ScheduledEnforcementDate="" Status="UnEnforced" Year="13">
      <LawNum>平成十三年文部科学省令第一号</LawNum>
      <LawBody></LawBody>
    </Law>
  </law_full_text>
  <attached_files_info/>
  <law_info>
    <law_type>MinisterialOrdinance</law_type>
    <law_id>413M60000080001</law_id>
    <law_num>平成十三年文部科学省令第一号</law_num>
    <law_num_era>Heisei</law_num_era>
    <law_num_year>13</law_num_year>
    <law_num_type>MinisterialOrdinance</law_num_type>
    <law_num_num>001</law_num_num>
    <promulgation_date>2001-01-06</promulgation_date>
  </law_info>
  <revision_info>
    <law_revision_id>413M60000080001_20231001_505M60000080014</law_revision_id>
    <law_type>MinisterialOrdinance</law_type>
    <law_title>文部科学省組織規則</law_title>
    <law_title_kana>もんぶかがくしょうそしききそく</law_title_kana>
    <law_title_kanaseion>もんふかかくしようそしききそく</law_title_kanaseion>
    <abbrev>
    </abbrev>
    <abbrev_kana>
    </abbrev_kana>
    <category>行政組織</category>
    <revision_index>612642</revision_index>
    <subrevision_index>1</subrevision_index>
    <updated>2023-04-18T06:14:17Z</updated>
    <previus_revision_id>413M60000080001_20230401_505M60000080014</previus_revision_id>
    <amendment_promulgate_date>2023-03-30</amendment_promulgate_date>
    <amendment_enforcement_date>2023-10-01</amendment_enforcement_date>
    <amendment_enforcement_end_date>9999-12-31</amendment_enforcement_end_date>
    <amendment_enforcement_comment/>
    <amendment_scheduled_enforcement_date/>
    <amendment_law_id>505M60000080014</amendment_law_id>
    <amendment_law_title>文部科学省組織規則の一部を改正する省令</amendment_law_title>
    <amendment_law_title_kana/>
    <amendment_law_title_kanaseion>
    </amendment_law_title_kanaseion>
    <amendment_law_num>令和五年文部科学省令第十四号</amendment_law_num>
    <repeal_status/>
    <remain_in_force>false</remain_in_force>
    <mission>New</mission>
    <status>UnEnforced</status>
    <is_last>true</is_last>
  </revision_info>
</lawdata_response>
`;

describe("getLawData関数のテスト", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("成功時に法令本文を返すべき", async () => {
    vi.spyOn(global, "fetch").mockImplementation(
      async () =>
        new Response(xml, {
          status: 200,
          headers: { "Content-Type": "application/xml" },
        })
    );

    const result = await getLawData({
      lawId: "427M60200000001",
    });

    if (!result.isSuccess) {
      return;
    }
    expect(result).toHaveProperty("isSuccess", true);
    expect(result.value).toHaveProperty("lawFullText");
    expect(result.value).toHaveProperty("attachedFilesInfo");
    expect(result.value).toHaveProperty("lawInfo");
    expect(result.value).toHaveProperty("revisionInfo");
  });

  it("失敗時にエラーを返すべき", async () => {
    vi.spyOn(global, "fetch").mockImplementation(
      async () =>
        new Response("", {
          status: 200,
          headers: { "Content-Type": "application/xml" },
        })
    );

    const result = await getLawData({
      lawId: "some-law-id",
      asof: "2022-01-01",
    });

    expect(result).toHaveProperty("isSuccess", false);
    expect(result).toHaveProperty("error");
  });

  it("バリデーションエラー時にエラーを返すべき", async () => {
    const result = await getLawData({ lawId: "", asof: "2022-01-01" });

    expect(result).toEqual({
      isSuccess: false,
      error: new Error("法令IDの入力は必須です(完全一致)"),
    });
  });
});

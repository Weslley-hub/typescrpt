import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1687781146810 implements MigrationInterface {
	name = "Default1687781146810";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query("CREATE TABLE \"users\" (\"id\" SERIAL NOT NULL, \"name\" text NOT NULL, \"age\" integer NOT NULL, \"email\" text NOT NULL, \"password\" text NOT NULL, CONSTRAINT \"PK_a3ffb1c0c8416b9fc6f907b7433\" PRIMARY KEY (\"id\"))");
		await queryRunner.query("CREATE TABLE \"videos\" (\"id\" SERIAL NOT NULL, \"title\" text NOT NULL, \"description\" text NOT NULL, \"chanell_id\" integer, CONSTRAINT \"PK_e4c86c0cf95aff16e9fb8220f6b\" PRIMARY KEY (\"id\"))");
		await queryRunner.query("CREATE TABLE \"channels\" (\"id\" SERIAL NOT NULL, \"name\" text NOT NULL, \"id_user\" integer, CONSTRAINT \"PK_bc603823f3f741359c2339389f9\" PRIMARY KEY (\"id\"))");
		await queryRunner.query("ALTER TABLE \"videos\" ADD CONSTRAINT \"FK_25d738299df16976218e1a1241a\" FOREIGN KEY (\"chanell_id\") REFERENCES \"channels\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
		await queryRunner.query("ALTER TABLE \"channels\" ADD CONSTRAINT \"FK_33d6ec128d5d15c4ec60c1aa141\" FOREIGN KEY (\"id_user\") REFERENCES \"users\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query("ALTER TABLE \"channels\" DROP CONSTRAINT \"FK_33d6ec128d5d15c4ec60c1aa141\"");
		await queryRunner.query("ALTER TABLE \"videos\" DROP CONSTRAINT \"FK_25d738299df16976218e1a1241a\"");
		await queryRunner.query("DROP TABLE \"channels\"");
		await queryRunner.query("DROP TABLE \"videos\"");
		await queryRunner.query("DROP TABLE \"users\"");
	}

}

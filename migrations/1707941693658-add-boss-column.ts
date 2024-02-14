import { MigrationInterface, QueryRunner } from "typeorm";

export class AddBossColumn1707941693658 implements MigrationInterface {
    name = 'AddBossColumn1707941693658'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "boss_id" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "boss_id"`);
    }

}

import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateNotificationsTable1755791884148 implements MigrationInterface {
    name = 'CreateNotificationsTable1755791884148'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "notifications" ("id" character varying NOT NULL, "userId" character varying NOT NULL, "message" character varying NOT NULL, "type" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "readAt" TIMESTAMP, CONSTRAINT "PK_6a72c3c0f683f6462415e653c3a" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "notifications"`);
    }

}

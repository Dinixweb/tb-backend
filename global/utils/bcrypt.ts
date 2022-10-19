import bcrypt from "bcrypt";

class Bcrypt {
  private encrypt: typeof bcrypt;
  constructor() {
    this.encrypt = bcrypt;
  }

  private generateSalt(): Promise<string> {
    return this.encrypt.genSalt(10);
  }
  public async hashPassword(password: string): Promise<string> {
    const salt: string = await this.generateSalt();
    return this.encrypt.hash(password, salt);
  }

  public async comparePassword(
    password: string,
    hash: string
  ): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }
}

export const Encrypt = new Bcrypt();

export default Bcrypt;

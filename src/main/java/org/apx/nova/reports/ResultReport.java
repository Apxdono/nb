package org.apx.nova.reports;

/**
 * Created by oleg on 22.04.2015.
 */
public class ResultReport {

    String fileName;
    byte[] binData;

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public byte[] getBinData() {
        return binData;
    }

    public void setBinData(byte[] binData) {
        this.binData = binData;
    }
}
